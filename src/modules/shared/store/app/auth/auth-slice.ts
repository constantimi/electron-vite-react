import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { refreshAccessToken } from './auth-thunk';
import { Status } from '../../../types/status';
import { RootState } from '../..';

export interface AuthState {
  authenticated: boolean;
  status: Status;
}

const initialState: AuthState = {
  authenticated: false,
  status: {
    code: -1,
    msg: '',
    loading: false,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthResponse: (state) => {
      state.status.code = initialState.status.code;
      state.status.loading = initialState.status.loading;
      state.status.msg = initialState.status.msg;

      state.authenticated = initialState.authenticated;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.authenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshAccessToken.pending, (state) => {
        state.status.code = -1;
        state.status.loading = true;
        state.authenticated = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state) => {
        state.status.code = 200;
        state.status.loading = false;
        state.authenticated = true;
      })
      .addCase(refreshAccessToken.rejected, (state) => {
        state.status.code = 403;
        state.status.loading = false;
        state.authenticated = false;
      });
  },
});

export default authSlice.reducer;

export const { resetAuthResponse, setAuthenticated } = authSlice.actions;

export const getAuthStatusSelector = createSelector(
  [(state: RootState) => state.app.auth.status],
  (status) => status
);

export const getAuthenticated = createSelector(
  (state: RootState) => state.app.auth.authenticated,
  (authenticated) => authenticated
);
