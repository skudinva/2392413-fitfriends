import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosError, AxiosInstance } from 'axios';
import type { History } from 'history';
import httpStatus from 'http-status';
import { ApiRoute, AppRoute } from '../const';
import {
  AuthUser,
  LoggedUserRdo,
  LoginUserDto,
  TokenPayload,
  UserRdo,
} from '../types/shared';
import { refreshToken, token } from '../utils';

type Extra = {
  api: AxiosInstance;
  history: History;
};

export const UserAction = {
  FETCH_USER_STATUS: 'user/fetch-status',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  REGISTER_USER: 'user/register',
  UPDATE_USER: 'user/update',
  FETCH_USER_INFO: '/user/fetch-user-info',
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
  const { api, history } = extra;
  const { data } = await api.post<LoggedUserRdo>(ApiRoute.Login, {
    email,
    password,
  });

  token.save(data.accessToken);
  refreshToken.save(data.refreshToken);
  history.push(AppRoute.Root);

  return {
    sub: data.id,
    email: data.email,
  };
});

export const logoutUser = createAsyncThunk<void, undefined, { extra: Extra }>(
  UserAction.LOGOUT_USER,
  async (_, { extra }) => {
    const { api } = extra;
    await api.delete(ApiRoute.Logout);

    token.drop();
  }
);

export const registerUser = createAsyncThunk<void, FormData, { extra: Extra }>(
  UserAction.REGISTER_USER,
  async (newUser, { extra }) => {
    const { api, history } = extra;
    await api.post<AuthUser>(ApiRoute.Register, newUser);
    history.push(AppRoute.Root);
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

export const fetchUserInfo = createAsyncThunk<
  UserRdo,
  string,
  { extra: Extra }
>(UserAction.FETCH_USER_INFO, async (id, { extra }) => {
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
});
