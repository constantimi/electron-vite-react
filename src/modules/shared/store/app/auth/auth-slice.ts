import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { refreshAccessToken } from './auth-thunk';
import { RootState } from '../..';

export type AuthStore = {
  authenticated: boolean;
  code: number;
  loading: boolean;
  msg: string;
};

const initialState: AuthStore = {
  authenticated: false,
  code: -1,
  loading: false,
  msg: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthResponse: (state) => {
      state.code = initialState.code;
      state.loading = initialState.loading;
      state.msg = initialState.msg;
      state.authenticated = initialState.authenticated;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.code = -1;
        state.loading = true;
        state.authenticated = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.code = 200;
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.code = 403;
        state.loading = false;
        state.authenticated = false;
      });
  },
});

export default authSlice.reducer;

export const { resetAuthResponse, setAuthenticated } = authSlice.actions;

export const getAuthStatus = (state: RootState) => state.app.auth;

export const getAuthStatusSelector = createSelector(
  [getAuthStatus],
  (status) => ({
    authCode: status.code,
    authLoading: status.loading,
  })
);

export const getAuthenticated = createSelector(
  (state: RootState) => state.app.auth.authenticated,
  (a) => a
);
