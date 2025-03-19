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

/*


export const getIsFavoriteOffersLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isFavoriteOffersLoading;
export const getFavoriteOffers = ({ [StoreSlice.SiteData]: SITE_DATA}: State): Offer[] => SITE_DATA.favoriteOffers;

export const getIsOfferLoading = ({ [StoreSlice.SiteData]: SITE_DATA }: State): boolean => SITE_DATA.isOfferLoading;
export const getOffer = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Offer | null => SITE_DATA.offer;

export const getPremiumOffers = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Offer[] => SITE_DATA.premiumOffers;
export const getComments = ({ [StoreSlice.SiteData]: SITE_DATA }: State): Comment[] => SITE_DATA.comments;
export const getCommentStatus = ({ [StoreSlice.SiteData]: SITE_DATA }: State): SubmitStatus => SITE_DATA.commentStatus;

export const selectOffers = createSelector(
  [getOffers, getCity, getSorting],
  (offers, city, sorting) => offers.filter((offer) => offer.city.name === city.name).sort(Comparator[sorting])
);

export const selectComments = createSelector(
  [getComments],
  (comments) => [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, MAX_COMMENTS)
);
*/
