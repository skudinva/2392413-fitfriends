import { StoreSlice } from '../../const';
import { State } from '../../types/state';

export const getIsTrainingLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isTrainingLoading;

export const getTraining = ({ [StoreSlice.SiteData]: SITE_DATA }: State) =>
  SITE_DATA.training;

export const getIsTrainingCardLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isTrainingCardLoading;

export const getTrainingCard = ({ [StoreSlice.SiteData]: SITE_DATA }: State) =>
  SITE_DATA.trainingCard;

export const getIsTrainingCommentLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isTrainingCommentLoading;

export const getTrainingComment = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.trainingComment;

export const getIsSuccessAddTrainingComment = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isSuccessAddTrainingComment;
