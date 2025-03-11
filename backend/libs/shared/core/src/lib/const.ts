import { EntityList } from './types/entity-list.enum';

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
    backgroundImage: {
      required: true,
      mimeTypes: '.(jpg|jpeg|png)',
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
    name: {
      required: true,
      minLength: 1,
      maxLength: 15,
    },
    backgroundImage: {
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
      mimeTypes: '.(mov|avi|mp4)',
    },
    trainerName: {
      required: true,
      minLength: 1,
      maxLength: 15,
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
