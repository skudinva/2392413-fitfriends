import { StoreSlice } from '../../const';
import { State } from '../../types/state';

export const getIsSpecialTrainingLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isSpecialTrainingLoading;

export const getSpecialTraining = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.specialTraining;

export const getIsTrainingLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isTrainingLoading;

export const getTraining = ({ [StoreSlice.SiteData]: SITE_DATA }: State) =>
  SITE_DATA.training;

export const getIsPopularTrainingLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isPopularTrainingLoading;

export const getPopularTraining = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.popularTraining;

export const getIsDiscountTrainingLoading = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.isDiscountTrainingLoading;

export const getDiscountTraining = ({
  [StoreSlice.SiteData]: SITE_DATA,
}: State) => SITE_DATA.discountTraining;

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
