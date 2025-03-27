import Token from './types/token';

export function isValidErrorData(data: unknown): data is { error: string } {
  return typeof data === 'object' && data !== null && 'error' in data;
}

export function isValidDetailErrorData(
  data: unknown
): data is { error: string } {
  return typeof data === 'object' && data !== null && 'detailMessage' in data;
}

export const token = new Token('fit-friends-auth-token');
export const refreshToken = new Token('fit-friends-auth-refresh-token');
