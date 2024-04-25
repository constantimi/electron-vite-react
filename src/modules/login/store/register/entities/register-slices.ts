import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import registerThunk from './register-thunk';
import { AppDispatch, AppGetState, RootState } from '../../../../shared/store';
import isUsernameValid from '../../../../shared/helpers/validateUsername';
import { RegisterScheme } from '../../../types/register';
import { Status } from '../../../../shared/types/status';

export const MAX_OTP_LENGTH = 8;

export type RegisterStoreSchema = {
  status: Status;
  form: {
    firstName: string;
    errFirstName: string;
    lastName: string;
    errLastName: string;
    username: string;
    errUsername: string;
  };
};

const initialState: RegisterStoreSchema = {
  status: {
    code: -1,
    loading: false,
    msg: '',
  },
  form: {
    firstName: '',
    errFirstName: '',
    lastName: '',
    errLastName: '',
    username: '',
    errUsername: '',
  },
};

const registerSlices = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.status = initialState.status;
      state.form = initialState.form;
    },
    resetStatus: (state) => {
      state.status = initialState.status;
    },
    resetFormErrors: (state) => {
      state.form.errFirstName = initialState.form.errFirstName;
      state.form.errLastName = initialState.form.errLastName;
      state.form.errUsername = initialState.form.errUsername;
    },
    setErrFirstName: (state, action: PayloadAction<string>) => {
      state.form.errFirstName = action.payload;
    },
    setErrLastName: (state, action: PayloadAction<string>) => {
      state.form.errLastName = action.payload;
    },
    setErrUsername: (state, action: PayloadAction<string>) => {
      state.form.errUsername = action.payload;
    },
    setRegisterArgs: (state, action: PayloadAction<[string, string]>) => {
      const [key, value] = action.payload;

      if (key === RegisterScheme.username) {
        if (!isUsernameValid(value)) {
          state.form.errUsername = 'errUsername';
        }
        state.form.username = value;
      }
      if (key === RegisterScheme.firstName) {
        state.form.firstName = value;
      }
      if (key === RegisterScheme.lastName) {
        state.form.lastName = value;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(registerThunk.fulfilled, (state) => {
        state.status.loading = false;
        state.status.code = 200;
        state.status.msg = '';
      })
      .addCase(registerThunk.rejected, (state, action) => {
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
          state.status.code = 401;
          state.status.msg = 'unauthorized';
        }
        if (state.status.code === 404) {
          state.status.code = 404;
          state.status.msg = 'notFound';
        }
        if (state.status.code === 409) {
          const { error } = axios.response.data;
          if (error.includes('username')) {
            state.status.msg = '';
            state.form.errUsername = 'notUniqueUsername';
          }
        }
      });
  },
});

export const {
  setInitialState,
  resetStatus,
  setErrFirstName,
  setErrLastName,
  setErrUsername,
  setRegisterArgs,
  resetFormErrors,
} = registerSlices.actions;

export default registerSlices.reducer;

export const isRegistrationValid =
  (username: string, firstName: string, lastName: string) =>
  (dispatch: AppDispatch): boolean => {
    let isValid = true;

    if (!isUsernameValid(username)) {
      dispatch(registerSlices.actions.setErrUsername('errUsername'));
      isValid = false;
    }

    if (!firstName) {
      dispatch(registerSlices.actions.setErrFirstName('errFirstName'));
      isValid = false;
    }
    if (!lastName) {
      dispatch(registerSlices.actions.setErrLastName('errLastName'));
      isValid = false;
    }

    return isValid;
  };

export const getRegisterStatus = (state: RootState) =>
  state.login.register.status;

export const getRegisterForm = (state: RootState) => state.login.register.form;

export const registerThunkStatusSelector = createSelector(
  [getRegisterStatus, getRegisterForm],
  (status, form) => ({
    status,
    errFirstName: form.errFirstName,
    errLastName: form.errLastName,
    errUsername: form.errUsername,
  })
);

export const getRegisterFormState = createSelector(
  [getRegisterForm],
  (state) => state
);

export const registerHandleOnChange =
  (key: string, value: string) => (dispatch: AppDispatch) => {
    dispatch(resetFormErrors());
    dispatch(setRegisterArgs([key, value]));
  };

export const handleRegisterState = (
  dispatch: AppDispatch,
  getState: AppGetState
) => {
  const { form } = getState().login.register;

  const isRegisterValid = dispatch(
    isRegistrationValid(form.username, form.firstName, form.lastName)
  );

  if (isRegisterValid) {
    dispatch(
      registerThunk({
        bodyArgs: {
          username: form.username,
          firstName: form.firstName,
          lastName: form.lastName,
        },
      })
    );
  }
};
