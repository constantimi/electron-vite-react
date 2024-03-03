import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { userSVGAvatars } from '../../../components/svgs/avatars';
import { loadUserInfo, updateUserInfo } from './user-thunk';
import { AppDispatch, AppGetState, RootState } from '../..';
import isUsernameValid from '../../../helpers/validateUsername';
import isValidName from '../../../helpers/validateName';
import isEmailValid from '../../../helpers/validateEmail';
import { UserFormScheme } from '../../../types/settings/userSettingsValidators';
import { SessionStore } from '../../../utils/session';
import { ErrorTag } from '../../thunk';

export type Status = {
  code: number;
  loading: boolean;
  msg: string;
};

export type UserSettingsOption = {
  init: string;
  value: string;
  err: string;
};

export type UserSettingsStoreSchema = {
  loaded: boolean;
  isUserModified: boolean;
  isUserUpdated: boolean;
  status: Status;
  email: UserSettingsOption;
  firstName: UserSettingsOption;
  lastName: UserSettingsOption;
  username: UserSettingsOption;
  avatarUrl: {
    init: string;
    value: string;
  };
};

const initialState: UserSettingsStoreSchema = {
  loaded: false,
  isUserModified: false,
  isUserUpdated: false,
  status: {
    code: -1,
    loading: false,
    msg: '',
  },
  email: {
    init: '',
    value: '',
    err: '',
  },
  firstName: {
    init: '',
    value: '',
    err: '',
  },
  lastName: {
    init: '',
    value: '',
    err: '',
  },
  username: {
    init: '',
    value: '',
    err: '',
  },
  avatarUrl: {
    init: userSVGAvatars[0],
    value: userSVGAvatars[0],
  },
};

export type AxiosResponseData = {
  error: string;
};

const hasChanged = (current: string, init: string) => current !== init;

const hasAnyValueChanged = (state: UserSettingsStoreSchema) =>
  hasChanged(state.avatarUrl.value, state.avatarUrl.init) ||
  hasChanged(state.username.value, state.username.init) ||
  hasChanged(state.firstName.value, state.firstName.init) ||
  hasChanged(state.lastName.value, state.lastName.init) ||
  hasChanged(state.email.value, state.email.init);

const userSettingsSlices = createSlice({
  name: 'userSettings',
  initialState,
  reducers: {
    setUserInitialState: (state) => {
      state.status = initialState.status;
      state.isUserUpdated = initialState.isUserUpdated;
      state.isUserModified = initialState.isUserModified;
      state.avatarUrl.value = state.avatarUrl.init;
      state.username.value = state.username.init;
      state.username.err = initialState.username.err;
      state.firstName.value = state.firstName.init;
      state.firstName.err = initialState.firstName.err;
      state.lastName.value = state.lastName.init;
      state.lastName.err = initialState.lastName.err;
      state.email.value = state.email.init;
      state.email.err = initialState.email.err;
    },
    setIsUserModified: (state) => {
      state.isUserUpdated = initialState.isUserUpdated;
      state.isUserModified = initialState.isUserModified;
      state.avatarUrl.init = state.avatarUrl.value;
      state.email.init = state.email.value;
      state.firstName.init = state.firstName.value;
      state.lastName.init = state.lastName.value;
    },
    setAvatarUrl: (state, action: PayloadAction<string>) => {
      state.avatarUrl.value = action.payload;
      state.isUserModified = hasAnyValueChanged(state);
    },
    setUserSettingsArgs: (state, action: PayloadAction<[string, string]>) => {
      const [key, value] = action.payload;

      if (key === UserFormScheme.username) {
        if (!isUsernameValid(value)) {
          state.username.err = 'errUsername';
        } else {
          state.username.err = initialState.username.err;
        }
        state.username.value = value;
      }
      if (key === UserFormScheme.firstName) {
        if (!isValidName(value)) {
          state.firstName.err = 'errFirstName';
        } else {
          state.firstName.err = initialState.firstName.err;
        }
        state.firstName.value = value;
      }
      if (key === UserFormScheme.lastName) {
        if (!isValidName(value)) {
          state.lastName.err = 'errLastName';
        } else {
          state.lastName.err = initialState.lastName.err;
        }
        state.lastName.value = value;
      }
      if (key === UserFormScheme.email) {
        if (!isEmailValid(value)) {
          state.email.err = 'errEmail';
        } else {
          state.email.err = initialState.email.err;
        }
        state.email.value = value;
      }

      state.isUserModified = hasAnyValueChanged(state);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserInfo.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(loadUserInfo.fulfilled, (state, action) => {
        state.status.loading = false;
        state.status.code = 200;
        state.status.msg = '';
        state.loaded = true;

        const { email, userName, firstName, lastName, avatarUrl } =
          action.payload;

        if (email) {
          state.email.init = email;
          state.email.value = email;
        }

        if (userName) {
          state.username.init = userName;
          state.username.value = userName;
        }

        if (firstName) {
          state.firstName.init = firstName;
          state.firstName.value = firstName;
        }

        if (lastName) {
          state.lastName.init = lastName;
          state.lastName.value = lastName;
        }

        if (avatarUrl) {
          state.avatarUrl.init = avatarUrl;
          state.avatarUrl.value = avatarUrl;
          SessionStore.setActiveUserAvatarURL(avatarUrl);
        }
      })
      .addCase(loadUserInfo.rejected, (state, action) => {
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
        if (state.status.code === 404) {
          state.status.msg = 'notFound';
        }
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
        state.isUserUpdated = true;
        state.status.loading = false;

        state.status.code = 200;
        state.status.msg = '';

        const { email, userName, firstName, lastName, avatarUrl } =
          action.payload;

        if (email) {
          state.email.init = email;
          state.email.value = email;
        }

        if (userName) {
          state.username.init = userName;
          state.username.value = userName;
        }

        if (firstName) {
          state.firstName.init = firstName;
          state.firstName.value = firstName;
        }

        if (lastName) {
          state.lastName.init = lastName;
          state.lastName.value = lastName;
        }

        if (avatarUrl) {
          state.avatarUrl.init = avatarUrl;
          state.avatarUrl.value = avatarUrl;
          SessionStore.setActiveUserAvatarURL(avatarUrl);
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
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
          state.status.msg = 'Failed to update user information.';

          const { error, fields } = axios.response.data;
          if (error === ErrorTag.Validation) {
            if (fields) {
              Object.entries(fields).forEach(([name]) => {
                if (name === 'email') {
                  state.email.err = 'notUniqueEmail';
                } else if (name === 'username') {
                  state.username.err = 'notUniqueUsername';
                }
              });
            }
          } else {
            state.status.msg = error;
          }
        }
        if (state.status.code === 401) {
          state.status.msg = 'unauthorized';
        }
        if (state.status.code === 404) {
          state.status.msg = 'notFound';
        }
      });
  },
});

export default userSettingsSlices.reducer;

export const {
  setUserInitialState,
  setIsUserModified,
  setAvatarUrl,
  setUserSettingsArgs,
} = userSettingsSlices.actions;

export const getUserStatusSelector = (state: RootState) =>
  state.app.userSettings.status;

export const userLoaded = createSelector(
  (state: RootState) => state.app.userSettings.loaded,
  (s) => s
);

export const userSettingsThunkSelector = createSelector(
  [getUserStatusSelector],
  (status) => ({
    userStatus: status,
  })
);

export const getUserSettings = (state: RootState) => state.app.userSettings;

export const userSettingsSelector = createSelector(
  [getUserSettings],
  (userSettings) => userSettings
);

export const setUseSettingsOnChange =
  (key: string, value: string) => (dispatch: AppDispatch) => {
    dispatch(setUserSettingsArgs([key, value]));
  };

export const applyUserSettings =
  (userId: string | null) => (dispatch: AppDispatch, getState: AppGetState) => {
    const { email, username, firstName, lastName, avatarUrl } =
      getState().app.userSettings;

    if (userId) {
      dispatch(
        updateUserInfo({
          urlArgs: userId,
          bodyArgs: {
            email: email.value,
            userName: username.value,
            firstName: firstName.value,
            lastName: lastName.value,
            avatarUrl: avatarUrl.value,
          },
        })
      );
    }
  };
