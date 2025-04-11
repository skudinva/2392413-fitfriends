import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import type { History } from 'history';
import httpStatus from 'http-status';
import {
  ApiRoute,
  AppRoute,
  DISCOUNT_TRAINING_LIMIT,
  SPECIAL_FOR_YOU_CARD_LIMIT,
} from '../const';
import {
  CreateCommentDto,
  CreateOrderDto,
  Order,
  SortDirection,
  SortType,
  TrainingCommentWithPagination,
  TrainingCommentWithUserInfo,
  TrainingOrderWithPagination,
  TrainingQuery,
  TrainingWithPagination,
  TrainingWithUserInfo,
} from '../types/shared';

type Extra = {
  api: AxiosInstance;
  history: History;
};

const TrainingAction = {
  FETCH_TRAININGS: 'trainings/fetch',
  FETCH_POPULAR_TRAINING: 'popular-trainings/fetch',
  FETCH_SPECIAL_TRAINING: 'special-trainings/fetch',
  FETCH_DISCOUNT_TRAINING: 'discount-trainings/fetch',
  FETCH_TRAINING: 'training/fetch',
  POST_TRAINING: 'training/post-training',
  EDIT_TRAINING: 'training/edit-training',
  DELETE_TRAINING: 'training/delete-training',
  FETCH_TRAINING_COMMENTS: 'training/comment/fetch',
  POST_TRAINING_COMMENT: 'training/comment/post',
  BUY_TRAINING: 'training/buy',
  FETCH_ORDERS: 'orders/fetch',
};

export const fetchTrainings = createAsyncThunk<
  TrainingWithPagination,
  TrainingQuery | null,
  { extra: Extra }
>(TrainingAction.FETCH_TRAININGS, async (query, { extra }) => {
  const { api } = extra;

  const queryStrings: string[] = [];
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            queryStrings.push(`${key}=${String(item)}`);
          });
        } else {
          queryStrings.push(`${key}=${String(value)}`);
        }
      }
    });
  }

  const { data } = await api.get<TrainingWithPagination>(
    `${ApiRoute.Trainings}?${queryStrings.join('&')}`
  );

  return data;
});

export const fetchSpecialTrainings = createAsyncThunk<
  TrainingWithPagination,
  undefined,
  { extra: Extra }
>(TrainingAction.FETCH_SPECIAL_TRAINING, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingWithPagination>(
    `${ApiRoute.Trainings}?page=1&sortBy=${SortType.Date}&sortDirection=${SortDirection.Desc}&limit=${SPECIAL_FOR_YOU_CARD_LIMIT}`
  );

  return data;
});

export const fetchDiscountTrainings = createAsyncThunk<
  TrainingWithPagination,
  undefined,
  { extra: Extra }
>(TrainingAction.FETCH_DISCOUNT_TRAINING, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingWithPagination>(
    `${ApiRoute.Trainings}?page=1&sortBy=${SortType.Date}&sortDirection=${SortDirection.Desc}&limit=${DISCOUNT_TRAINING_LIMIT}&isSpecial=true`
  );

  return data;
});

export const fetchPopularTrainings = createAsyncThunk<
  TrainingWithPagination,
  undefined,
  { extra: Extra }
>(TrainingAction.FETCH_POPULAR_TRAINING, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingWithPagination>(
    `${ApiRoute.Trainings}?page=1&sortBy=${SortType.Rating}&sortDirection=${SortDirection.Desc}`
  );

  return data;
});

export const fetchTraining = createAsyncThunk<
  TrainingWithUserInfo,
  TrainingWithUserInfo['id'],
  { extra: Extra }
>(TrainingAction.FETCH_TRAINING, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<TrainingWithUserInfo>(
      `${ApiRoute.Trainings}/${id}`
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === httpStatus.NOT_FOUND) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
});

export const fetchComment = createAsyncThunk<
  TrainingCommentWithPagination,
  TrainingCommentWithUserInfo['id'],
  { extra: Extra }
>(TrainingAction.FETCH_TRAINING_COMMENTS, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<TrainingCommentWithPagination>(
      `${ApiRoute.Comments}/${id}`
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === httpStatus.NOT_FOUND) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
});

export const createComment = createAsyncThunk<
  TrainingCommentWithUserInfo,
  CreateCommentDto,
  { extra: Extra }
>(TrainingAction.POST_TRAINING_COMMENT, async (dto, { extra }) => {
  const { api } = extra;
  try {
    const { data } = await api.post<TrainingCommentWithUserInfo>(
      `${ApiRoute.Comments}/${dto.trainingId}`,
      dto
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const buyTraining = createAsyncThunk<
  Order,
  CreateOrderDto,
  { extra: Extra }
>(TrainingAction.BUY_TRAINING, async (dto, { extra }) => {
  const { api } = extra;
  try {
    const { data } = await api.post<Order>(
      `${ApiRoute.Order}/${dto.trainingId}`,
      dto
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});

export const fetchOrders = createAsyncThunk<
  TrainingOrderWithPagination,
  undefined,
  { extra: Extra }
>(TrainingAction.FETCH_ORDERS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingOrderWithPagination>(
    `${ApiRoute.Order}?page=1&sortBy=${SortType.Date}&sortDirection=${SortDirection.Desc}`
  );

  return data;
});
