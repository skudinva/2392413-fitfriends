import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type { History } from 'history';
import { ApiRoute } from '../const';
import {
  CreateOrderDto,
  Order,
  OrderWithTraining,
  TrainingOrderQuery,
  TrainingOrderWithPagination,
  UpdateOrderStateDto,
} from '../types/shared';
import { composeQuery } from '../utils';

type Extra = {
  api: AxiosInstance;
  history: History;
};

const OrderAction = {
  BUY_TRAINING: 'training/buy',
  FETCH_ORDERS: 'orders/fetch',
  FETCH_TRAINING_STATE: 'training/state/fetch',
  UPDATE_TRAINING_STATE: 'training/state/update',
};

export const buyTraining = createAsyncThunk<
  OrderWithTraining,
  CreateOrderDto,
  { extra: Extra }
>(OrderAction.BUY_TRAINING, async (dto, { extra }) => {
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
>(OrderAction.FETCH_ORDERS, async (query, { extra }) => {
  const { api } = extra;
  const queryString = query ? composeQuery(query) : '';

  const { data } = await api.get<TrainingOrderWithPagination>(
    `${ApiRoute.Order}?${queryString}`
  );

  return data;
});

export const fetchTrainingState = createAsyncThunk<
  Order | null,
  Order['trainingId'],
  { extra: Extra }
>(OrderAction.FETCH_TRAINING_STATE, async (trainingId, { extra }) => {
  if (!trainingId) {
    return null;
  }

  const { api } = extra;
  const { data } = await api.get<Order>(`${ApiRoute.Order}/${trainingId}`);

  return data || null;
});

export const updateTrainingState = createAsyncThunk<
  Order,
  UpdateOrderStateDto,
  { extra: Extra }
>(OrderAction.UPDATE_TRAINING_STATE, async (dto, { extra }) => {
  const { api } = extra;
  try {
    const { data } = await api.put<Order>(
      `${ApiRoute.Order}/${dto.trainingId}`,
      dto
    );
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
});
