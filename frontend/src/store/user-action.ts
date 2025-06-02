import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError, AxiosInstance } from 'axios';
import type { History } from 'history';
import httpStatus from 'http-status';
import { ApiRoute, AppRoute } from '../const';
import {
  AuthUser,
  FriendQuery,
  LoggedUserRdo,
  LoginUserDto,
  TokenPayload,
  UserRdo,
  UserWithPagination,
} from '../types/shared';
import { composeQuery, refreshToken, token } from '../utils';

type Extra = {
  api: AxiosInstance;
  history: History;
};

const UserAction = {
  FETCH_USER_STATUS: 'user/fetch-status',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  REGISTER_USER: 'user/register',
  UPDATE_USER: 'user/update',
  FETCH_USER_INFO: 'user/fetch-user-info',
  FETCH_USER_CARD_INFO: 'user/fetch-user-card-info',
  FETCH_FRIEND: 'friend/fetch-friend',
  FETCH_FRIEND_STATUS: 'friend/fetch-friend-status',
  ADD_FRIEND: 'friend/add-friend',
  DELETE_FRIEND: 'friend/delete-friend',
};

export const fetchUserStatus = createAsyncThunk<
  TokenPayload,
  undefined,
  { extra: Extra }
>(UserAction.FETCH_USER_STATUS, async (_, { extra }) => {
  const { api } = extra;

  try {
    const { data } = await api.post<TokenPayload>(ApiRoute.CheckLogin);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === httpStatus.UNAUTHORIZED) {
      token.drop();
    }

    return Promise.reject(error);
  }
});

export const loginUser = createAsyncThunk<
  TokenPayload,
  LoginUserDto,
  { extra: Extra }
>(UserAction.LOGIN_USER, async ({ email, password }, { extra }) => {
  const { api } = extra;

  const { data } = await api.post<LoggedUserRdo>(ApiRoute.Login, {
    email,
    password,
  });

  token.save(data.accessToken);
  refreshToken.save(data.refreshToken);

  if (data.id && data.email) {
    return {
      sub: data.id,
      email: data.email,
      role: data.role,
    };
  }

  return Promise.reject('Incorrect login or password');
});

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  UserAction.LOGOUT_USER,
  () => {
    token.drop();
    refreshToken.drop();
  }
);

export const registerUser = createAsyncThunk<void, FormData, { extra: Extra }>(
  UserAction.REGISTER_USER,
  async (newUser, { extra, dispatch }) => {
    const { api } = extra;
    await api.post<AuthUser>(ApiRoute.Register, newUser);
    const loginDto: LoginUserDto = {
      email: newUser.get('email')?.toString() || '',
      password: newUser.get('password')?.toString() || '',
    };
    dispatch(loginUser(loginDto));
  }
);

export const updateUser = createAsyncThunk<UserRdo, FormData, { extra: Extra }>(
  UserAction.UPDATE_USER,
  async (updateDto, { extra }) => {
    const { api } = extra;
    const { data } = await api.patch<UserRdo>(ApiRoute.UserUpdate, updateDto);
    return data;
  }
);

const fetchUserProfile = async (id: string, extra: Extra) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<UserRdo>(`${ApiRoute.Users}/${id}`);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === httpStatus.NOT_FOUND) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
};

export const fetchUserInfo = createAsyncThunk<
  UserRdo,
  string,
  { extra: Extra }
>(UserAction.FETCH_USER_INFO, async (id, { extra }) =>
  fetchUserProfile(id, extra)
);

export const fetchUserCardInfo = createAsyncThunk<
  UserRdo,
  string,
  { extra: Extra }
>(UserAction.FETCH_USER_CARD_INFO, async (id, { extra }) =>
  fetchUserProfile(id, extra)
);

export const fetchFriend = createAsyncThunk<
  UserWithPagination,
  FriendQuery | null,
  { extra: Extra }
>(UserAction.FETCH_FRIEND, async (query, { extra }) => {
  const { api } = extra;
  const queryString = query ? composeQuery(query) : '';
  const { data } = await api.get<UserWithPagination>(
    `${ApiRoute.Friends}?${queryString}`
  );

  return data;
});

export const addFriend = createAsyncThunk<UserRdo, string, { extra: Extra }>(
  UserAction.ADD_FRIEND,
  async (friendId, { extra }) => {
    const { api } = extra;

    const { data } = await api.post<UserRdo>(`${ApiRoute.Friends}/${friendId}`);
    return data;
  }
);

export const deleteFriend = createAsyncThunk<string, string, { extra: Extra }>(
  UserAction.DELETE_FRIEND,
  async (friendId, { extra }) => {
    const { api } = extra;

    await api.delete<UserRdo>(`${ApiRoute.Friends}/${friendId}`);
    return friendId;
  }
);

export const getFriendStatus = createAsyncThunk<
  boolean,
  string,
  { extra: Extra }
>(UserAction.FETCH_FRIEND_STATUS, async (friendId, { extra }) => {
  const { api } = extra;

  const { data } = await api.get<boolean>(`${ApiRoute.Friends}/${friendId}`);

  return data;
});
