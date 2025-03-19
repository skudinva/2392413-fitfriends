import { Prisma, PrismaClient } from '@prisma/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  EntityConstrain,
  TRAINING_DURATIONS,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '../../../shared/core/src';
import {
  mockTrainerNames,
  mockTrainingComments,
  mockTrainingDescribes,
  mockTrainingTitles,
  mockUserIds,
} from './seed.constants';

function getRandomEnumValue<E extends { [key: string]: unknown }>(
  enumObject: E
): E[keyof E] {
  const values = Object.values(enumObject) as E[keyof E][];
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

function generateRandomDate(start: Date, end: Date) {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime =
    Math.floor(Math.random() * (endTime - startTime + 1)) + startTime;

  return new Date(randomTime);
}

function getRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

function getRandomItem<T>(items: T[]): T {
  return items[getRandomValue(0, items.length - 1)];
}

function getTraining(): Prisma.TrainingUncheckedCreateInput {
  return {
    title: getRandomItem(mockTrainingTitles),
    image: `img/content/training-${getRandomValue(1, 4, 0)}.png`,
    level: getRandomEnumValue(TrainingLevel),
    type: getRandomEnumValue(TrainingType),
    duration: getRandomItem([...TRAINING_DURATIONS]),
    price: getRandomValue(0, 2000, 0),
    calories: getRandomValue(
      EntityConstrain.training.calories.minValue,
      EntityConstrain.training.calories.maxValue,
      0
    ),
    description: getRandomItem(mockTrainingDescribes),
    gender: getRandomEnumValue(UserGender),
    video: `video/content/training-${getRandomValue(1, 4, 0)}.mp4`,
    rating: getRandomValue(1, 5, 0),
    trainer: getRandomItem(mockTrainerNames),
    isSpecial: getRandomItem([true, false]),
    createdAt: generateRandomDate(new Date(2024, 0, 1), new Date()),
  };
}

function getComment(
  trainingId: number,
  userIds: string[]
): Prisma.CommentUncheckedCreateInput {
  const mongoIdIndex = getRandomValue(0, userIds.length - 1, 0);
  const userId = userIds[mongoIdIndex];
  userIds.splice(mongoIdIndex, 1);
  return {
    userId,
    trainingId,
    rating: getRandomValue(1, 5, 0),
    message: getRandomItem(mockTrainingComments),
    createdAt: generateRandomDate(new Date(2024, 0, 1), new Date()),
  };
}

async function seedDb(prismaClient: PrismaClient) {
  const trainings = Array.from({ length: 100 }, () => getTraining());

  for (const training of trainings) {
    const newTraining = await prismaClient.training.create({ data: training });
    const userIds = [...mockUserIds];
    const comments = Array.from({ length: 5 }, () =>
      getComment(newTraining.id, userIds)
    );

    for (const comment of comments) {
      await prismaClient.comment.create({ data: comment });
    }
  }

  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
