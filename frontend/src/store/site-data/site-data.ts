import { createSlice } from '@reduxjs/toolkit';
import { StoreSlice } from '../../const';
import type { SiteData } from '../../types/state';
import {
  buyTraining,
  createComment,
  fetchComment,
  fetchDiscountTrainings,
  fetchOrders,
  fetchPopularTrainings,
  fetchSpecialTrainings,
  fetchTraining,
  fetchTrainings,
} from '../training-action';

const initialState: SiteData = {
  specialTraining: null,
  isSpecialTrainingLoading: false,
  training: null,
  isTrainingLoading: false,
  trainingCard: null,
  isTrainingCardLoading: false,
  trainingComment: null,
  isTrainingCommentLoading: false,
  isSuccessAddTrainingComment: false,
  popularTraining: null,
  isPopularTrainingLoading: false,
  discountTraining: null,
  isDiscountTrainingLoading: false,
  isSuccessBuyOrder: false,
  isUserOrderLoading: false,
  userOrder: null,
};

export const siteData = createSlice({
  name: StoreSlice.SiteData,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSpecialTrainings.pending, (state) => {
        state.isSpecialTrainingLoading = true;
      })
      .addCase(fetchSpecialTrainings.fulfilled, (state, action) => {
        state.specialTraining = action.payload;
        state.isSpecialTrainingLoading = false;
      })
      .addCase(fetchSpecialTrainings.rejected, (state) => {
        state.isSpecialTrainingLoading = false;
      })

      .addCase(fetchDiscountTrainings.pending, (state) => {
        state.isDiscountTrainingLoading = true;
      })
      .addCase(fetchDiscountTrainings.fulfilled, (state, action) => {
        state.discountTraining = action.payload;
        state.isDiscountTrainingLoading = false;
      })
      .addCase(fetchDiscountTrainings.rejected, (state) => {
        state.isDiscountTrainingLoading = false;
      })

      .addCase(fetchTrainings.pending, (state) => {
        state.isTrainingLoading = true;
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        if (!state.training || action.payload.currentPage === 1) {
          state.training = action.payload;
        } else if (state.training) {
          state.training = {
            entities: [...state.training.entities, ...action.payload.entities],
            itemsPerPage: action.payload.itemsPerPage,
            totalItems: state.training.totalItems + action.payload.totalItems,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
            maxPrice: action.payload.maxPrice,
          };
        }
        state.isTrainingLoading = false;
      })
      .addCase(fetchTrainings.rejected, (state) => {
        state.isTrainingLoading = false;
      })

      .addCase(fetchPopularTrainings.pending, (state) => {
        state.isPopularTrainingLoading = true;
      })
      .addCase(fetchPopularTrainings.fulfilled, (state, action) => {
        state.popularTraining = action.payload;
        state.isPopularTrainingLoading = false;
      })
      .addCase(fetchPopularTrainings.rejected, (state) => {
        state.isPopularTrainingLoading = false;
      })

      .addCase(fetchTraining.pending, (state) => {
        state.isTrainingCardLoading = true;
      })
      .addCase(fetchTraining.fulfilled, (state, action) => {
        state.trainingCard = action.payload;
        state.isTrainingCardLoading = false;
      })
      .addCase(fetchTraining.rejected, (state) => {
        state.isTrainingCardLoading = false;
      })

      .addCase(fetchComment.pending, (state) => {
        state.isTrainingCommentLoading = true;
      })
      .addCase(fetchComment.fulfilled, (state, action) => {
        state.trainingComment = action.payload;
        state.isTrainingCommentLoading = false;
      })
      .addCase(fetchComment.rejected, (state) => {
        state.isTrainingCommentLoading = false;
      })

      .addCase(createComment.pending, (state) => {
        state.isSuccessAddTrainingComment = false;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        if (state.trainingComment) {
          state.trainingComment.entities.unshift(action.payload);
          state.isSuccessAddTrainingComment = true;
        }
      })
      .addCase(createComment.rejected, (state) => {
        state.isSuccessAddTrainingComment = false;
      })

      .addCase(buyTraining.pending, (state) => {
        state.isSuccessBuyOrder = false;
      })
      .addCase(buyTraining.fulfilled, (state, action) => {
        if (state.userOrder) {
          state.userOrder.entities.unshift(action.payload);
          state.isSuccessBuyOrder = true;
        }
      })
      .addCase(buyTraining.rejected, (state) => {
        state.isSuccessBuyOrder = false;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.isUserOrderLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isUserOrderLoading = false;
        state.userOrder = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.isUserOrderLoading = false;
      });
  },
});
