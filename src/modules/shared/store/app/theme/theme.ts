import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { ThemeObject } from '../../../types/theme';
import { ThemeService } from './helper/service';
import config from '../../../config/config';

type ThemeStore = {
  name: string;
} & ThemeObject;

const initialState: ThemeStore = {
  name: config.settings.defaultTheme,
  ...ThemeService.getTheme(config.settings.defaultTheme),
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    updateTheme: (state, action: PayloadAction<string>) => {
      const t = action.payload;
      if (ThemeService.has(t)) {
        const theme = ThemeService.getTheme(t);
        Object.assign(state, theme, { name: t });
      }
    },
  },
});

export default ThemeSlice.reducer;

export const { updateTheme } = ThemeSlice.actions;

export const getTheme = createSelector(
  [(state: RootState) => state.app.theme],
  (theme) => theme
);
