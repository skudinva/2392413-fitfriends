import {
  AuthUser,
  Entity,
  Location,
  StorableEntity,
  UserGender,
} from '@backend/shared/core';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './shop-user.constant';

export class ShopUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email!: string;
  public name!: string;
  public avatar!: string;
  public gender!: UserGender;
  public birthday!: Date;
  public description!: string;
  public location!: Location;
  public backgroundImage!: string;
  public registerDate!: Date;
  public passwordHash!: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }
  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }
    const {
      id,
      email,
      name,
      avatar,
      gender,
      birthday,
      description,
      location,
      backgroundImage,
      registerDate,
      passwordHash,
    } = user;

    this.id = id ?? '';
    this.email = email;
    this.name = name;
    this.avatar = avatar;
    this.gender = gender;
    this.birthday = birthday;
    this.description = description;
    this.location = location;
    this.backgroundImage = backgroundImage;
    this.registerDate = registerDate;
    this.passwordHash = passwordHash;
  }

  toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatar: this.avatar,
      gender: this.gender,
      birthday: this.birthday,
      description: this.description,
      location: this.location,
      backgroundImage: this.backgroundImage,
      registerDate: this.registerDate,
      passwordHash: this.passwordHash,
    };
  }

  public async setPassword(password: string): Promise<ShopUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
