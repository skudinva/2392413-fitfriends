import {
  generateRandomDate,
  getRandomEnumValue,
  getRandomItem,
  getRandomValue,
  mockUsers,
} from '@backend/helpers';
import { LOCATIONS, UserGender } from '@backend/shared/core';
import { ShopUserEntity, ShopUserSchema } from '@backend/shop-user';
import mongoose from 'mongoose';
import { Command } from './command.interface';

export class GenerateCommand implements Command {
  private async uploadAccountToDatabase(connectionString: string) {
    await mongoose.connect(connectionString);
    const userModel = mongoose.model('accounts', ShopUserSchema);
    const locations = [...LOCATIONS];
    for (const mockUser of mockUsers) {
      const newUser = new ShopUserEntity({
        email: mockUser.email,
        name: mockUser.name,
        avatar: `img/content/avatars/users/photo-${getRandomValue(
          1,
          5,
          0
        )}.png`,
        gender: getRandomEnumValue(UserGender),
        birthday: generateRandomDate(new Date(1980, 0, 1), new Date()),
        description: '',
        location: getRandomItem(locations),
        backgroundImage: '',
        registerDate: generateRandomDate(new Date(2024, 0, 1), new Date()),
        passwordHash: '',
        role: mockUser.role,
      });
      await newUser.setPassword('123456');
      userModel.create(newUser.toPOJO());
    }

    console.info(`🤘️ User database was added of ${mockUsers.length} user`);
  }

  public getName(): string {
    return '--generate';
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, mongoConnectionString] = parameters;
    const usersCount = parseInt(count, 10);
    if (usersCount <= 0) {
      console.error('Количество тестовых пользователей должно быть больше 0');
      globalThis.process.exit(1);
    }

    try {
      await this.uploadAccountToDatabase(mongoConnectionString);
      globalThis.process.exit(0);
    } catch (error: unknown) {
      console.error(error);
      globalThis.process.exit(1);
    }
  }
}
