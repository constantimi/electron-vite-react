import {
  PayloadAction,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { loginThunk, signupThunk } from './login-thunk';
import { AppDispatch, AppGetState, RootState } from '../../../../shared/store';
import isEmailValid from '../../../../shared/helpers/validateEmail';
import { TabNames } from '../../../types/enum';
import { Status } from '../../../../shared/types/status';

type Tab = {
  active: boolean;
};

export type LoginStoreSchema = {
  status: Status;
  email: string;
  tabs: Record<TabNames, Tab>;
};

const initialState: LoginStoreSchema = {
  status: {
    code: -1,
    loading: false,
    msg: '',
  },
  email: '',
  tabs: {
    [TabNames.Login]: {
      active: true,
    },
    [TabNames.SignUp]: {
      active: false,
    },
  },
};

const loginSlices = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setInitialState: (state) => {
      state.status = initialState.status;
      state.email = initialState.email;
      state.tabs = initialState.tabs;
    },
    setLoginQueryVariables: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setErrMessage: (state, action: PayloadAction<string>) => {
      state.status.msg = action.payload;
    },
    resetRequestStatus: (state) => {
      state.status = initialState.status;
    },
    setActiveTab: (state, action: PayloadAction<TabNames>) => {
      Object.keys(state.tabs).forEach((tabName) => {
        state.tabs[tabName as TabNames].active = tabName === action.payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(loginThunk.pending, signupThunk.pending), (state) => {
        state.status.loading = true;
      })
      .addMatcher(
        isAnyOf(loginThunk.fulfilled, signupThunk.fulfilled),
        (state) => {
          state.status.loading = false;
          state.status.code = 200;
          state.status.msg = '';
        }
      )
      .addMatcher(
        isAnyOf(loginThunk.rejected, signupThunk.rejected),
        (state, action) => {
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

          if (axios.response.data.error) {
            if (axios.response.data.error === 'email is not unique') {
              state.status.msg = 'Email already registered';
            }
          } else if (state.status.code === 400) {
            state.status.msg = 'badRequest';
          } else if (state.status.code === 401) {
            state.status.msg = 'unauthorized';
          } else if (state.status.code === 403) {
            state.status.msg = 'forbidden';
          } else if (state.status.code === 404) {
            state.status.msg = 'notFound';
          }
        }
      );
  },
});

export const {
  setLoginQueryVariables,
  setInitialState,
  setErrMessage,
  resetRequestStatus,
  setActiveTab,
} = loginSlices.actions;

export default loginSlices.reducer;

export const tabsStateSelector = createSelector(
  [(state: RootState) => state.login.login.tabs],
  (tabs) => tabs
);

export const loginThunkStatusSelector = createSelector(
  [(state: RootState) => state.login.login.status],
  (status) => status
);

export const loginEmailSelector = createSelector(
  [(state: RootState) => state.login.login.email],
  (email) => ({
    email,
  })
);

export const activeTabSelector = createSelector(
  [(state: RootState) => state.login.login.tabs],
  (tabs) => {
    const activeTabName = Object.keys(tabs).find(
      (tabName) => tabs[tabName as TabNames].active
    );

    return activeTabName ?? TabNames.Login;
  }
);

export const handleLoginState = (
  dispatch: AppDispatch,
  getState: AppGetState
) => {
  const { email, tabs } = getState().login.login;

  const activeTab = Object.keys(tabs).find(
    (tabName) => tabs[tabName as TabNames].active
  );

  if (isEmailValid(email)) {
    if (activeTab === TabNames.Login) {
      dispatch(
        loginThunk({
          headerArgs: {
            email,
          },
        })
      );
    } else if (activeTab === TabNames.SignUp) {
      dispatch(
        signupThunk({
          headerArgs: {
            email,
          },
          bodyArgs: {
            email,
          },
        })
      );
    }
  } else {
    dispatch(loginSlices.actions.setErrMessage('Invalid email address'));
  }
};
