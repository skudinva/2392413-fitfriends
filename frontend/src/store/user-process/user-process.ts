import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, StoreSlice } from '../../const';
import type { UserProcess } from '../../types/state';
import {
  fetchUserCardInfo,
  fetchUserInfo,
  fetchUserStatus,
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
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {
          sub: '',
          email: '',
          role: null,
        };
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
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
      });
  },
});
