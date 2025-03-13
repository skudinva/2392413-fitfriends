import { AuthorizationStatus, StoreSlice } from '../../const';
import type { State } from '../../types/state';

export const getAuthorizationStatus = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.authorizationStatus;

export const getIsAuthorized = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.authorizationStatus === AuthorizationStatus.Auth;

export const getCurrentUser = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.user;

export const getUserInfoLoading = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.isUserInfoLoading;

export const getUserInfo = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.userInfo;
