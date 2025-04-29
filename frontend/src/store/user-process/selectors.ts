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

export const getCurrentUserId = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.user.sub;

export const getUserInfoLoading = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.isUserInfoLoading;

export const getUserInfo = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.userInfo;

export const getIsUserInfoSave = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.isUserInfoSave;

export const getUserCardInfo = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.userCardInfo;

export const getUserRole = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.user?.role;

export const getIsUserCardInfoLoading = ({
  [StoreSlice.UserProcess]: USER_PROCESS,
}: State) => USER_PROCESS.isUserCardInfoLoading;
