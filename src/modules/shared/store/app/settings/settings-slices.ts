import i18n from 'i18next';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, AppGetState, RootState } from '../..';
import { loadUserSettings, updateUserSettings } from './settings-thunk';
import { setActiveTheme } from '../theme';
import LocalSettings from './local/local';

import { LANGUAGECODES } from '../../../constants/lang';
import { FONTSIZE } from '../../../constants/fontSize';
import { ThemeService } from '../theme/helper/service';
import config from '../../../config/config';
import { SettingsStoreSchema } from '../../../types/settings/settingsValidators';

const initialState: SettingsStoreSchema = {
  loaded: false,
  isSettingsModified: false,
  isSettingsUpdated: false,
  status: {
    code: -1,
    loading: false,
    msg: '',
  },
  defaultLang: {
    init: LocalSettings.get('defaultLang'),
    value: LocalSettings.get('defaultLang'),
  },
  defaultFontSize: {
    init: LocalSettings.get('defaultFontSize'),
    value: LocalSettings.get('defaultFontSize'),
  },
  defaultTheme: {
    init: LocalSettings.get('defaultTheme'),
    value: LocalSettings.get('defaultTheme'),
  },
  touchscreen: false,
};

const hasChanged = (current: string, init: string) => current !== init;

const hasAnyValueChanged = (state: SettingsStoreSchema) =>
  hasChanged(state.defaultLang.value, state.defaultLang.init) ||
  hasChanged(state.defaultFontSize.value, state.defaultFontSize.init) ||
  hasChanged(state.defaultTheme.value, state.defaultTheme.init);

const SettingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettingsInitialState: (state) => {
      state.status = initialState.status;
      state.isSettingsUpdated = initialState.isSettingsUpdated;
      state.isSettingsModified = initialState.isSettingsModified;
      state.defaultFontSize.value = state.defaultFontSize.init;
      state.defaultLang.value = state.defaultLang.init;
      state.defaultTheme.value = state.defaultTheme.init;
    },
    setIsSettingsModified: (state) => {
      state.isSettingsUpdated = initialState.isSettingsUpdated;
      state.isSettingsModified = initialState.isSettingsModified;
      state.defaultFontSize.init = state.defaultFontSize.value;
      state.defaultLang.init = state.defaultLang.value;
      state.defaultTheme.init = state.defaultTheme.value;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.defaultLang.value = action.payload;
      state.isSettingsModified = hasAnyValueChanged(state);
    },
    setFontSize: (state, action: PayloadAction<string>) => {
      state.defaultFontSize.value = action.payload;
      state.isSettingsModified = hasAnyValueChanged(state);
    },
    setTheme: (state, action: PayloadAction<string>) => {
      state.defaultTheme.value = action.payload;
      state.isSettingsModified = hasAnyValueChanged(state);
    },
    setTouchScreen: (state, action: PayloadAction<boolean>) => {
      state.touchscreen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserSettings.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(loadUserSettings.fulfilled, (state, action) => {
        state.status.loading = false;
        state.status.code = 200;
        state.status.msg = '';
        state.loaded = true;

        const { lang, fontSize, theme } = action.payload;

        if (lang) {
          state.defaultLang.init = lang.toLowerCase();
          state.defaultLang.value = lang.toLowerCase();
          LocalSettings.set('defaultLang', lang.toLowerCase());
        }

        if (fontSize) {
          state.defaultFontSize.init = fontSize;
          state.defaultFontSize.value = fontSize;
          LocalSettings.set('defaultFontSize', fontSize);
        }

        if (theme) {
          const selectedTheme = ThemeService.has(theme)
            ? theme
            : config.settings.defaultTheme;

          state.defaultTheme.init = selectedTheme;
          state.defaultTheme.value = selectedTheme;
          LocalSettings.set('defaultTheme', selectedTheme);
        }
      })
      .addCase(loadUserSettings.rejected, (state, action) => {
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
      .addCase(updateUserSettings.pending, (state) => {
        state.status.loading = true;
      })
      .addCase(updateUserSettings.fulfilled, (state) => {
        state.isSettingsUpdated = true;
        state.status.loading = false;
        state.status.code = 200;
        state.status.msg = '';
      })
      .addCase(updateUserSettings.rejected, (state, action) => {
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
      });
  },
});

export default SettingsSlice.reducer;

export const {
  setSettingsInitialState,
  setIsSettingsModified,
  setLanguage,
  setFontSize,
  setTheme,
  setTouchScreen,
} = SettingsSlice.actions;

export const getSettingsStatusSelector = (state: RootState) =>
  state.app.settings.status;

export const settingsThunkSelector = createSelector(
  [getSettingsStatusSelector],
  (status) => ({
    settingsStatus: status,
  })
);

export const settingsLoaded = createSelector(
  (state: RootState) => state.app.settings.loaded,
  (s) => s
);

export const getSettings = (state: RootState) => state.app.settings;

export const settingsSelector = createSelector(
  [getSettings],
  (settings) => settings
);

export const getTouchScreen = createSelector(
  (state: RootState) => state.app.settings.touchscreen,
  (t) => t
);

export const getLanguageOptions = (state: RootState) => ({
  active: state.app.settings.defaultLang.value,
  all: [...LANGUAGECODES],
});

export const getFontSizeOptions = (state: RootState) => ({
  active: state.app.settings.defaultFontSize.value,
  all: [...FONTSIZE],
});

export const setThemeSettings = (theme: string) => (dispatch: AppDispatch) => {
  dispatch(setTheme(theme));
  dispatch(setActiveTheme(theme));
};

export const setLanguageSettings =
  (lang: string) => (dispatch: AppDispatch) => {
    dispatch(setLanguage(lang));

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  };

export const applySettings =
  (userId: string | null) => (dispatch: AppDispatch, getState: AppGetState) => {
    const { defaultLang, defaultFontSize, defaultTheme } =
      getState().app.settings;

    if (userId) {
      LocalSettings.set('defaultLang', defaultLang.value);
      LocalSettings.set('defaultFontSize', defaultFontSize.value);
      LocalSettings.set('defaultTheme', defaultTheme.value);

      dispatch(
        updateUserSettings({
          urlArgs: userId,
          bodyArgs: {
            lang: defaultLang.value.toUpperCase(),
            fontSize: defaultFontSize.value,
            theme: defaultTheme.value,
          },
        })
      );
    }
  };
