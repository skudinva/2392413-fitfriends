import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, StoreSlice } from '../../const';
import type { UserProcess } from '../../types/state';
import {
  addFriend,
  deleteFriend,
  fetchFriend,
  fetchUserCardInfo,
  fetchUserCatalog,
  fetchUserCompany,
  fetchUserInfo,
  fetchUserStatus,
  getFriendStatus,
  loginUser,
  logoutUser,
  updateUser,
} from '../user-action';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: {
    sub: '',
    email: '',
    role: null,
  },
  isUserInfoLoading: false,
  userInfo: null,
  isUserInfoSave: false,
  userCardInfo: null,
  isUserCardInfoLoading: false,
  isUserFriend: false,
  friend: {
    entities: [],
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 0,
  },
  isFriendLoading: false,
  isSuccessSwitchFriend: false,
  userCompany: {
    entities: [],
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 0,
  },
  isUserCompanyLoading: false,
  userCatalog: {
    entities: [],
    totalPages: 0,
    totalItems: 0,
    itemsPerPage: 0,
  },
  isUserCatalogLoading: false,
};

export const userProcess = createSlice({
  name: StoreSlice.UserProcess,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUserStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(fetchUserStatus.rejected, (state) => {
        state.user = {
          sub: '',
          email: '',
          role: null,
        };
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.user = { email: '', sub: '', role: null };
      })
      .addCase(logoutUser.fulfilled, () => ({
        ...initialState,
        authorizationStatus: AuthorizationStatus.NoAuth,
      }))
      .addCase(fetchUserInfo.pending, (state) => {
        state.isUserInfoLoading = true;
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isUserInfoLoading = false;
      })
      .addCase(fetchUserInfo.rejected, (state) => {
        state.isUserInfoLoading = false;
      })
      .addCase(getFriendStatus.fulfilled, (state, action) => {
        state.isUserFriend = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.isUserInfoSave = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        state.isUserInfoSave = false;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isUserInfoSave = false;
      })

      .addCase(fetchUserCardInfo.pending, (state) => {
        state.isUserCardInfoLoading = true;
      })
      .addCase(fetchUserCardInfo.fulfilled, (state, action) => {
        state.userCardInfo = action.payload;
        state.isUserCardInfoLoading = false;
      })
      .addCase(fetchUserCardInfo.rejected, (state) => {
        state.isUserCardInfoLoading = false;
      })

      .addCase(fetchFriend.pending, (state) => {
        state.isFriendLoading = true;
      })
      .addCase(fetchFriend.fulfilled, (state, action) => {
        if (!state.friend || action.payload.currentPage === 1) {
          state.friend = action.payload;
        } else if (state.friend) {
          state.friend = {
            entities: [...state.friend.entities, ...action.payload.entities],
            itemsPerPage: action.payload.itemsPerPage,
            totalItems: state.friend.totalItems + action.payload.totalItems,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
          };
        }

        state.isFriendLoading = false;
      })
      .addCase(fetchFriend.rejected, (state) => {
        state.isFriendLoading = false;
      })

      .addCase(addFriend.pending, (state) => {
        state.isSuccessSwitchFriend = false;
      })
      .addCase(addFriend.fulfilled, (state, action) => {
        if (state.friend) {
          state.friend.entities.unshift(action.payload);
          state.isSuccessSwitchFriend = true;
          state.isUserFriend = true;
        }
      })
      .addCase(addFriend.rejected, (state) => {
        state.isSuccessSwitchFriend = false;
      })

      .addCase(deleteFriend.pending, (state) => {
        state.isSuccessSwitchFriend = false;
      })
      .addCase(deleteFriend.fulfilled, (state, action) => {
        if (state.friend) {
          state.friend.entities = state.friend.entities.filter(
            (friend) => friend.id !== action.payload
          );
          state.isUserFriend = false;
          state.isSuccessSwitchFriend = true;
        }
      })
      .addCase(deleteFriend.rejected, (state) => {
        state.isSuccessSwitchFriend = false;
      })
      .addCase(fetchUserCatalog.pending, (state) => {
        state.isUserCatalogLoading = true;
      })
      .addCase(fetchUserCatalog.fulfilled, (state, action) => {
        if (!state.userCatalog || action.payload.currentPage === 1) {
          state.userCatalog = action.payload;
        } else if (state.userCatalog) {
          state.userCatalog = {
            entities: [
              ...state.userCatalog.entities,
              ...action.payload.entities,
            ],
            itemsPerPage: action.payload.itemsPerPage,
            totalItems:
              state.userCatalog.totalItems + action.payload.totalItems,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
          };
        }

        state.isUserCatalogLoading = false;
      })
      .addCase(fetchUserCatalog.rejected, (state) => {
        state.isUserCatalogLoading = false;
      })

      .addCase(fetchUserCompany.pending, (state) => {
        state.isUserCompanyLoading = true;
      })
      .addCase(fetchUserCompany.fulfilled, (state, action) => {
        if (!state.userCompany || action.payload.currentPage === 1) {
          state.userCompany = action.payload;
        } else if (state.userCompany) {
          state.userCompany = {
            entities: [
              ...state.userCompany.entities,
              ...action.payload.entities,
            ],
            itemsPerPage: action.payload.itemsPerPage,
            totalItems:
              state.userCompany.totalItems + action.payload.totalItems,
            totalPages: action.payload.totalPages,
            currentPage: action.payload.currentPage,
          };
        }

        state.isUserCompanyLoading = false;
      })
      .addCase(fetchUserCompany.rejected, (state) => {
        state.isUserCompanyLoading = false;
      });
  },
});
