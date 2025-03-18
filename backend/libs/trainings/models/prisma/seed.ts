import { PrismaClient, Training } from '@prisma/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import {
  EntityConstrain,
  TRAINING_DURATIONS,
  TrainingLevel,
  TrainingType,
  UserGender,
} from '../../../shared/core/src';

function getRandomEnumValue<E>(enumObject: E): E[keyof E] {
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

const mockTrainingTitle = [
  'Взрыв',
  'Стальной пресс',
  'Бег',
  'Титан',
  'Атлант',
  'Энергия+',
  'Драйв',
  'Чемпион',
  'Сила',
  'Турбо',
  'Прорыв',
  'Титан-X',
  'Спарта',
  'Феникс',
  'Олимп',
];

const mockTrainerName = [
  'ВикторСилаев',
  'АннаГромова',
  'ДмитрийШторм',
  'МарияПобеда',
  'ОлегЛидер',
  'СергейАтлет',
  'ТатьянаСталь',
  'ПавелЧемпион',
  'ЕленаДрайв',
  'МаксимТитан',
];

const mockTrainingDescribe = [
  'Интенсивная кардио-сессия для сжигания жира',
  'Упражнения на гибкость и баланс в парной работе',
  'Силовая тренировка с собственным весом для начинающих',
  'Комплексная тренировка на все группы мышц',
  'Функциональные упражнения для развития выносливости',
  'Быстрая 20-минутная тренировка для поддержания формы',
  'Тренировка на развитие скорости и координации',
  'Комбинированная тренировка: сила + кардио',
  'Упражнения с гантелями для наращивания мышечной массы',
  'Тренировка на развитие тактического мышления и командных навыков',
];

function getTraining(id: number): Training {
  return {
    id: id + 1,
    title: getRandomItem(mockTrainingTitle),
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
    description: getRandomItem(mockTrainingDescribe),
    gender: getRandomEnumValue(UserGender),
    video: `video/content/training-${getRandomValue(1, 4, 0)}.mp4`,
    rating: getRandomValue(1, 5, 0),
    trainer: getRandomItem(mockTrainerName),
    isSpecial: getRandomItem([true, false]),
    createdAt: generateRandomDate(new Date(2024, 0, 1), new Date()),
  };
}

async function seedDb(prismaClient: PrismaClient) {
  const mockTrainings = Array.from({ length: 100 }, (_v, k) => getTraining(k));

  for (const training of mockTrainings) {
    await prismaClient.training.upsert({
      where: { id: training.id },
      update: {},
      create: training,
    });
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
