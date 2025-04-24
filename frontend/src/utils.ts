import Token from './types/token';

export function isValidErrorData(data: unknown): data is { error: string } {
  return typeof data === 'object' && data !== null && 'error' in data;
}

export function isValidDetailErrorData(
  data: unknown
): data is { error: string } {
  return typeof data === 'object' && data !== null && 'detailMessage' in data;
}

export function composeQuery(query: object) {
  const queryStrings: string[] = [];
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (String(item).trim().length) {
              queryStrings.push(`${key}=${String(item)}`);
            }
          });
        } else {
          if (String(value).trim().length) {
            queryStrings.push(`${key}=${String(value)}`);
          }
        }
      }
    });
  }
  return queryStrings.join('&');
}

export function getRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export const token = new Token('fit-friends-auth-token');
export const refreshToken = new Token('fit-friends-auth-refresh-token');
