import { TokenPayload } from '@backend/shared/core';
import { AuthorizationStatus, StoreSlice } from '../../const';
import type { State } from '../../types/state';

export const getAuthorizationStatus = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): AuthorizationStatus => USER_PROCESS.authorizationStatus;
export const getIsAuthorized = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): boolean =>
  USER_PROCESS.authorizationStatus === AuthorizationStatus.Auth;
export const getUser = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): TokenPayload => USER_PROCESS.user;
