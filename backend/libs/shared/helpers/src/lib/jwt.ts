import { TokenPayload, User } from '@backend/shared/core';

export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id,
    email: user.email,
    role: user.role,
  };
}
