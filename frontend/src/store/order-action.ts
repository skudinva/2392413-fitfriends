import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { History } from 'history';
import { ApiRoute } from '../const';
import {
  CreateOrderDto,
  OrderWithTraining,
  SortDirection,
  SortType,
  TrainingOrderQuery,
  TrainingOrderWithPagination,
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

export const buyTraining = createAsyncThunk<
  OrderWithTraining,
  CreateOrderDto,
  { extra: Extra }
>(TrainingAction.BUY_TRAINING, async (dto, { extra }) => {
  const { api } = extra;
  try {
    const { data } = await api.post<OrderWithTraining>(
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
  TrainingOrderQuery,
  { extra: Extra }
>(TrainingAction.FETCH_ORDERS, async ({ page, activeOnly }, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<TrainingOrderWithPagination>(
    `${ApiRoute.Order}?page=${page ?? 1}&activeOnly=${String(
      activeOnly
    )}&sortBy=${SortType.Date}&sortDirection=${SortDirection.Desc}`
  );

  return data;
});
