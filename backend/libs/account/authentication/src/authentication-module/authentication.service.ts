import { jwtConfig } from '@backend/config';
import { createJWTPayload } from '@backend/helpers';
import { AuthUser, Token, User } from '@backend/shared/core';
import { ShopUserEntity, ShopUserRepository } from '@backend/shop-user';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import dayjs from 'dayjs';
import { randomUUID } from 'node:crypto';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { AuthenticationResponseMessage } from './authentication.constant';

@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);
  constructor(
    private readonly shopUserRepository: ShopUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto): Promise<ShopUserEntity> {
    const {
      email,
      name,
      avatar,
      gender,
      birthday,
      description,
      location,
      password,
      role,
    } = dto;

    const shopUser: AuthUser = {
      email,
      name,
      avatar,
      gender,
      birthday,
      description,
      location,
      registerDate: dayjs().toDate(),
      passwordHash: '',
      role,
    };

    const existUser = await this.shopUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthenticationResponseMessage.UserExist);
    }

    const userEntity = await new ShopUserEntity(shopUser).setPassword(password);

    await this.shopUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthenticationResponseMessage.UserNotFound);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(
        AuthenticationResponseMessage.LoggedError
      );
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.shopUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthenticationResponseMessage.UserNotFound);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error(`[Token generation error]: ${error.message}`);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.shopUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  public async update(dto: UpdateUserDto, id?: string) {
    if (!id) {
      throw new UnauthorizedException(
        AuthenticationResponseMessage.Unauthorized
      );
    }

    const existUser = await this.shopUserRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(AuthenticationResponseMessage.UserNotFound);
    }

    const updateUser = new ShopUserEntity({ ...existUser, ...dto, ...{ id } });

    await this.shopUserRepository.update(updateUser);
    return updateUser;
  }
}
