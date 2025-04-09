import { Prisma, PrismaClient } from '@prisma/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  EntityConstrain,
  SPECIAL_DISCOUNT,
  TRAINING_DURATIONS,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '../../../shared/core/src';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  generateRandomDate,
  getRandomEnumValue,
  getRandomItem,
  getRandomValue,
} from '../../../shared/helpers/src/lib/randomize';

// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  mockTrainingComments,
  mockTrainingDescribes,
  mockTrainingTitles,
  mockUsers,
} from '../../../shared/helpers/src/lib/mock';

function getTraining(): Prisma.TrainingUncheckedCreateInput {
  const price = getRandomValue(0, 2000, 0);
  const isSpecial = getRandomItem([true, false]);

  return {
    title: getRandomItem(mockTrainingTitles),
    image: `img/content/training-${getRandomValue(1, 4, 0)}.png`,
    level: getRandomEnumValue(TrainingLevel),
    type: getRandomEnumValue(TrainingType),
    duration: getRandomItem([...TRAINING_DURATIONS]),
    price,
    calories: getRandomValue(
      EntityConstrain.training.calories.minValue,
      EntityConstrain.training.calories.maxValue,
      0
    ),
    description: getRandomItem(mockTrainingDescribes),
    gender: getRandomEnumValue(UserGender),
    video: `video/content/training-${getRandomValue(1, 4, 0)}.mp4`,
    rating: getRandomValue(1, 5, 0),
    userId: getRandomItem(mockUsers).id,
    isSpecial,
    specialPrice: isSpecial
      ? +((price * SPECIAL_DISCOUNT) / 100).toFixed(0)
      : price,
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
  try {
    const trainings = Array.from({ length: 100 }, () => getTraining());
    for (let i = 0; i < 10; i++) {
      trainings[i].price = 0;
    }

    await Promise.all(
      trainings.map(async (training) => {
        const newTraining = await prismaClient.training.create({
          data: training,
        });

        const userIds = mockUsers.map((user) => user.id);
        const comments = Array.from({ length: 5 }, () =>
          getComment(newTraining.id, userIds)
        );

        await Promise.all(
          comments.map(async (comment) =>
            prismaClient.comment.create({ data: comment })
          )
        );

        const rating =
          comments.reduce((total, comment) => total + comment.rating, 0) /
          comments.length;

        await prismaClient.training.update({
          data: { rating },
          where: { id: newTraining.id },
        });

        return newTraining;
      })
    );

    console.info('🤘️ Database was filled');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
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
