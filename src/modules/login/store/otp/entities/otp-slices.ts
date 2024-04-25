import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import otpThunk from './otp-thunk';
import { AxiosClient } from '../../../../shared/utils/axios';
import { AppDispatch, AppGetState, RootState } from '../../../../shared/store';
import { isOtpValid } from '../../../../shared/helpers/validateOtp';
import { Status } from '../../../../shared/types/status';

export const MAX_OTP_LENGTH = 8;

export type OtpStoreSchema = {
  status: Status;
  otp: Array<string>;
  currentRefIndex: number;
  email: string;
};

const initialState: OtpStoreSchema = {
  status: {
    code: -1,
    loading: false,
    msg: '',
  },
  otp: new Array<string>(MAX_OTP_LENGTH).fill(''),
  currentRefIndex: 0,
  email: '',
};

const otpSlices = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.status = initialState.status;
      state.otp = initialState.otp;
      state.currentRefIndex = initialState.currentRefIndex;
      state.email = initialState.email;
    },
    setErrMessage: (state, action: PayloadAction<string>) => {
      state.status.msg = action.payload;
    },
    setOtp: (state, action: PayloadAction<Array<string>>) => {
      state.otp = action.payload;
    },
    setCurrentRefIndex: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < 8) {
        state.currentRefIndex = action.payload;
      }
    },
    setOtpQueryVariables: (state, action: PayloadAction<[string, string]>) => {
      const [email, otp] = action.payload;
      state.email = email;
      state.otp = Array.from(
        { length: MAX_OTP_LENGTH },
        (_, i) => otp[i] || ''
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(otpThunk.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(otpThunk.fulfilled, (state, action) => {
        state.status.loading = false;
        state.status.code = 200;
        state.status.msg = '';

        if (!action.payload) return;

        const accessToken = action.payload.access_token;
        const refreshToken = action.payload.refresh_token;

        AxiosClient.setTokens(accessToken, refreshToken);
      })
      .addCase(otpThunk.rejected, (state, action) => {
        state.status.loading = false;
        state.status.msg = 'internalServerError';
        state.status.code = 500;

        if (
          !action.payload ||
          action.payload.validation ||
          !action.payload.error ||
          !action.payload.error.axios
        ) {
          return;
        }

        const { axios } = action.payload.error;

        if (!axios.response?.status) return;

        state.status.code = axios.response.status;

        if (state.status.code === 400) {
          state.status.msg = 'badRequest';
        }
        if (state.status.code === 401) {
          state.status.msg = 'unauthorized';
        }
        if (state.status.code === 403) {
          state.status.msg = 'forbidden';
        }
        if (state.status.code === 404) {
          state.status.msg = 'notFound';
        }
      });
  },
});

export const {
  setInitialState,
  setOtp,
  setCurrentRefIndex,
  setOtpQueryVariables,
  setErrMessage,
} = otpSlices.actions;

export default otpSlices.reducer;

export const getOtpSelector = (state: RootState) => state.login.otp.otp;

export const getEmailSelector = (state: RootState) => state.login.otp.email;

export const otpThunkStatusSelector = createSelector(
  [(state: RootState) => state.login.otp.status],
  (status) => status
);

export const otpCurrentRefSelector = (state: RootState) =>
  state.login.otp.currentRefIndex;

export const readClipboard =
  (clipboard: string) => (dispatch: AppDispatch, getState: AppGetState) => {
    const { status, email } = getState().login.otp;
    const textCode = clipboard.replace(/\s+/g, '');
    const newOtp = textCode
      .slice(0, MAX_OTP_LENGTH)
      .split('-')
      .join('')
      .split('');

    while (newOtp.length < MAX_OTP_LENGTH) {
      newOtp.push('');
    }

    dispatch(setOtp(newOtp));

    if (isOtpValid(newOtp) && !status.loading) {
      const { login } = getState().login;
      dispatch(
        otpThunk({
          headerArgs: {
            email: email || login.email,
            otp: newOtp.join(''),
          },
        })
      );
    }
  };

export const setOtpEntry =
  (index: number, entry: string) =>
  (dispatch: AppDispatch, getState: AppGetState) => {
    if (index < 0 || index > 7) {
      return;
    }
    const current = getState().login.otp.otp;
    current[index] = entry;
    dispatch(setOtp(current));
  };

export const otpHandleKeyPress =
  (key: string, index: number) =>
  (dispatch: AppDispatch, getState: AppGetState) => {
    const { otp, status, email } = getState().login.otp;
    const newOtp = [...otp];

    if (/^[a-zA-Z0-9]$/.test(key)) {
      newOtp[index] = key.toUpperCase();

      dispatch(setCurrentRefIndex(index + 1));
      dispatch(setErrMessage(''));
      dispatch(setOtp(newOtp));

      if (isOtpValid(newOtp) && !status.loading) {
        const { login } = getState().login;
        dispatch(
          otpThunk({
            headerArgs: {
              email: email || login.email,
              otp: newOtp.join(''),
            },
          })
        );
      }
    }
    if (key === 'Backspace') {
      newOtp[index] = '';
      dispatch(setCurrentRefIndex(index - 1));
      dispatch(setOtp(newOtp));
      dispatch(setErrMessage(''));
    }
    if (key === 'ArrowRight') {
      dispatch(setCurrentRefIndex(index + 1));
    }
    if (key === 'ArrowLeft') {
      dispatch(setCurrentRefIndex(index - 1));
    }
  };

export const setOtpQueryEntry =
  (email: string, otp: string) => (dispatch: AppDispatch) => {
    dispatch(setOtpQueryVariables([email, otp]));

    if (isOtpValid(otp)) {
      dispatch(
        otpThunk({
          headerArgs: {
            email,
            otp,
          },
        })
      );
    }
  };
