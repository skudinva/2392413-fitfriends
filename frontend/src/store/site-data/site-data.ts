import { createSlice } from '@reduxjs/toolkit';
import { StoreSlice } from '../../const';
import type { SiteData } from '../../types/state';
import {
  createComment,
  fetchComment,
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
      });
  },
});
