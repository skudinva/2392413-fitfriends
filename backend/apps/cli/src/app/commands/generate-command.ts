import { FriendEntity, FriendsSchema } from '@backend/friend';
import {
  generateRandomDate,
  getRandomEnumValue,
  getRandomItem,
  getRandomValue,
  mockSportsmanUsers,
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
        id: mockUser.id,
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
        registerDate: generateRandomDate(new Date(2024, 0, 1), new Date()),
        passwordHash: '',
        role: mockUser.role,
        readyForTraining: getRandomItem([true, false]),
      });
      await newUser.setPassword('123456');
      await userModel.create(newUser);
    }

    console.info(`🤘️ User database was added of ${mockUsers.length} user`);
  }

  private async uploadFriendToDatabase(connectionString: string) {
    await mongoose.connect(connectionString);
    const friendModel = mongoose.model('friends', FriendsSchema);
    for (const mockUser of mockSportsmanUsers) {
      const userIds = mockUsers.filter((user) => user.id !== mockUser.id);

      for (let index = 0; index < 5; index++) {
        const userIndex = getRandomValue(0, userIds.length - 1);
        await Promise.all([
          friendModel.create(
            new FriendEntity({
              id: new mongoose.Types.ObjectId().toString(),
              userId: mockUser.id,
              friendId: userIds[userIndex].id,
            })
          ),

          friendModel.create(
            new FriendEntity({
              id: new mongoose.Types.ObjectId().toString(),
              userId: userIds[userIndex].id,
              friendId: mockUser.id,
            })
          ),
        ]);

        userIds.splice(userIndex, 1);
      }
    }
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
      await this.uploadFriendToDatabase(mongoConnectionString);
      globalThis.process.exit(0);
    } catch (error: unknown) {
      console.error(error);
      globalThis.process.exit(1);
    }
  }
}
