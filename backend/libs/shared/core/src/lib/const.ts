import { EntityList } from './types/entity-list.enum';
import { FixedQuestionValue } from './types/fixed-question-value.interface';
import { TrainingLevel } from './types/training-level.enum';
import { UserGender } from './types/user-gender.enum';

export const SERVE_ROOT = 'static';
export const EntityConstrain = {
  [EntityList.User]: {
    name: {
      required: true,
      minLength: 1,
      maxLength: 15,
    },
    email: {
      required: true,
    },
    avatar: {
      required: false,
      mimeTypes: '.(jpg|jpeg|png)',
      maxFileSize: 1024000,
    },
    password: {
      required: true,
      minLength: 6,
      maxLength: 12,
    },
    sex: {
      required: true,
    },
    birthday: {
      required: false,
    },
    description: {
      required: false,
      minLength: 10,
      maxLength: 140,
    },
    location: {
      required: true,
    },
  },
  [EntityList.Feedback]: {
    mark: {
      required: true,
      minValue: 1,
      maxValue: 5,
    },
    comment: {
      required: true,
      minLength: 100,
      maxLength: 1024,
    },
  },
  [EntityList.Training]: {
    title: {
      required: true,
      minLength: 1,
      maxLength: 15,
    },
    image: {
      required: true,
      mimeTypes: '.(jpg|jpeg|png)',
    },
    calories: {
      required: true,
      minValue: 1000,
      maxValue: 5000,
    },
    description: {
      required: true,
      minLength: 10,
      maxLength: 140,
    },
    video: {
      required: true,
      mimeTypes: '.(mov|avi|mp4|quicktime)',
    },
  },
  [EntityList.Order]: {
    amount: {
      required: true,
      minValue: 1,
      maxValue: 50,
    },
  },
} as const;

export const LOCATIONS = [
  'Пионерская',
  'Петроградская',
  'Удельная',
  'Звёздная',
  'Спортивная',
] as const;

export const TRAINING_DURATIONS = [
  '10-30 мин',
  '30-50 мин',
  '50-80 мин',
  '80-100 мин',
] as const;

export const DefaultFixedQuestionValue: {
  [key in UserGender]: FixedQuestionValue;
} = {
  [UserGender.Man]: {
    calories: 3300,
    trainingLevel: TrainingLevel.Beginner,
  },
  [UserGender.Female]: {
    calories: 2300,
    trainingLevel: TrainingLevel.Beginner,
  },
  [UserGender.NotAvailable]: {
    calories: 3300,
    trainingLevel: TrainingLevel.Beginner,
  },
} as const;

export const SPECIAL_DISCOUNT = 10;
