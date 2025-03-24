import { createSlice } from '@reduxjs/toolkit';
import { StoreSlice } from '../../const';
import type { SiteData } from '../../types/state';
import {
  createComment,
  fetchComment,
  fetchPopularTrainings,
  fetchTraining,
  fetchTrainings,
} from '../training-action';

const initialState: SiteData = {
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
      .addCase(fetchTrainings.pending, (state) => {
        state.isTrainingLoading = true;
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.training = action.payload;
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
/*
  extraReducers(builder) {
    builder
      .addCase(fetchTrainings.pending, (state) => {
        state.isOffersLoading = true;
      })
      .addCase(fetchTrainings.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })
      .addCase(fetchTrainings.rejected, (state) => {
        state.isOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffers.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchFavoriteOffers.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })
      .addCase(fetchOffer.rejected, (state) => {
        state.isOfferLoading = false;
      })
      .addCase(postOffer.fulfilled, (state, action) => {
        state.offers.push(action.payload);
      })
      .addCase(editOffer.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.favoriteOffers = state.favoriteOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.premiumOffers = state.premiumOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
      })
      .addCase(fetchPremiumOffers.fulfilled, (state, action) => {
        state.premiumOffers = action.payload;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(postComment.pending, (state) => {
        state.commentStatus = SubmitStatus.Pending;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.commentStatus = SubmitStatus.Fullfilled;
      })
      .addCase(postComment.rejected, (state) => {
        state.commentStatus = SubmitStatus.Rejected;
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.premiumOffers = state.premiumOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.favoriteOffers = state.favoriteOffers.concat(updatedOffer);

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        state.offers = state.offers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.premiumOffers = state.premiumOffers.map((offer) =>
          offer.id === updatedOffer.id ? updatedOffer : offer
        );
        state.favoriteOffers = state.favoriteOffers.filter(
          (favoriteOffer) => favoriteOffer.id !== updatedOffer.id
        );

        if (state.offer && state.offer.id === updatedOffer.id) {
          state.offer = updatedOffer;
        }
      });
  },*/
