import { AuthorizationStatus, StoreSlice } from '../../const';
import { TokenPayload, UserRdo } from '../../types/shared';
import type { State } from '../../types/state';

export const getAuthorizationStatus = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): AuthorizationStatus => USER_PROCESS.authorizationStatus;

export const getIsAuthorized = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): boolean =>
  USER_PROCESS.authorizationStatus === AuthorizationStatus.Auth;

export const getCurrentUser = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): TokenPayload => USER_PROCESS.user;

export const getUserInfoLoading = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): boolean => USER_PROCESS.isUserInfoLoading;

export const getUserInfo = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State): UserRdo => USER_PROCESS.userInfo;
