/*
type Extra = {
  api: AxiosInstance;
  history: History;
};

export const Action = {
  FETCH_OFFERS: 'offers/fetch',
  FETCH_OFFER: 'offer/fetch',
  POST_OFFER: 'offer/post-offer',
  EDIT_OFFER: 'offer/edit-offer',
  DELETE_OFFER: 'offer/delete-offer',
  FETCH_FAVORITE_OFFERS: 'offers/fetch-favorite',
  FETCH_PREMIUM_OFFERS: 'offers/fetch-premium',
  FETCH_COMMENTS: 'offer/fetch-comments',
  POST_COMMENT: 'offer/post-comment',
  POST_FAVORITE: 'offer/post-favorite',
  DELETE_FAVORITE: 'offer/delete-favorite',
  LOGIN_USER: 'user/login',
  LOGOUT_USER: 'user/logout',
  FETCH_USER_STATUS: 'user/fetch-status',
  REGISTER_USER: 'user/register',
  UPDATE_USER: 'user/update',
  FETCH_USER_INFO: '/user/fetch-user-info',
};
*/
/*
export const fetchOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: Extra }
>(Action.FETCH_OFFERS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferListRdo[]>(ApiRoute.Offers);

  return adaptOffersToClient(data);
});

export const fetchFavoriteOffers = createAsyncThunk<
  Offer[],
  undefined,
  { extra: Extra }
>(Action.FETCH_FAVORITE_OFFERS, async (_, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferListRdo[]>(ApiRoute.Favorite);

  return adaptOffersToClient(data);
});

export const fetchOffer = createAsyncThunk<
  Offer,
  Offer['id'],
  { extra: Extra }
>(Action.FETCH_OFFER, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.get<OfferRdo>(`${ApiRoute.Offers}/${id}`);

    return adaptOfferDetailToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.NOT_FOUND) {
      history.push(AppRoute.NotFound);
    }

    return Promise.reject(error);
  }
});

export const postOffer = createAsyncThunk<Offer, NewOffer, { extra: Extra }>(
  Action.POST_OFFER,
  async (newOffer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.post<OfferRdo>(
      ApiRoute.Offers,
      adaptNewOfferToServer(newOffer)
    );
    history.push(`${AppRoute.Property}/${data.id}`);

    return adaptOfferDetailToClient(data);
  }
);

export const editOffer = createAsyncThunk<Offer, Offer, { extra: Extra }>(
  Action.EDIT_OFFER,
  async (offer, { extra }) => {
    const { api, history } = extra;
    const { data } = await api.patch<OfferRdo>(
      `${ApiRoute.Offers}/${offer.id}`,
      offer
    );
    history.push(`${AppRoute.Property}/${data.id}`);

    return adaptOfferDetailToClient(data);
  }
);

export const deleteOffer = createAsyncThunk<void, string, { extra: Extra }>(
  Action.DELETE_OFFER,
  async (id, { extra }) => {
    const { api, history } = extra;
    await api.delete(`${ApiRoute.Offers}/${id}`);
    history.push(AppRoute.Root);
  }
);

export const fetchPremiumOffers = createAsyncThunk<
  Offer[],
  string,
  { extra: Extra }
>(Action.FETCH_PREMIUM_OFFERS, async (cityName, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<OfferListRdo[]>(
    `${ApiRoute.Premium}/${cityName}`
  );

  return adaptOffersToClient(data);
});

export const fetchComments = createAsyncThunk<
  Comment[],
  Offer['id'],
  { extra: Extra }
>(Action.FETCH_COMMENTS, async (id, { extra }) => {
  const { api } = extra;
  const { data } = await api.get<ReviewRdo[]>(
    `${ApiRoute.Offers}/${id}${ApiRoute.Comments}`
  );

  return adaptCommentsToClient(data);
});

export const postComment = createAsyncThunk<
  Comment,
  CommentAuth,
  { extra: Extra }
>(Action.POST_COMMENT, async ({ id, comment, rating }, { extra }) => {
  const { api } = extra;
  const { data } = await api.post<ReviewRdo>(
    `${ApiRoute.Offers}/${id}${ApiRoute.Comments}`,
    { comment, rating }
  );

  return adaptCommentToClient(data);
});

export const postFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.POST_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.post<OfferRdo>(`${ApiRoute.Favorite}/${id}`);

    return adaptOfferDetailToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});

export const deleteFavorite = createAsyncThunk<
  Offer,
  FavoriteAuth,
  { extra: Extra }
>(Action.DELETE_FAVORITE, async (id, { extra }) => {
  const { api, history } = extra;

  try {
    const { data } = await api.delete<OfferRdo>(`${ApiRoute.Favorite}/${id}`);

    return adaptOfferDetailToClient(data);
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === HttpCode.UNAUTHORIZED) {
      history.push(AppRoute.Login);
    }

    return Promise.reject(error);
  }
});
*/
