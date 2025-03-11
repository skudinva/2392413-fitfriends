import Token from './types/token';

export function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

export function getRandomElement<T>(array: readonly T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function pluralize(str: string, count: number) {
  return count === 1 ? str : `${str}s`;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidErrorData(data: unknown): data is { error: string } {
  return typeof data === 'object' && data !== null && 'error' in data;
}

export const token = new Token('fit-friends-auth-token');
export const refreshToken = new Token('fit-friends-auth-refresh-token');
