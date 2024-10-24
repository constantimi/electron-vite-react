import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../..';
import { Theme } from '../../../types/theme';
import { ThemeService } from './helper/service';
import config from '../../../config/config';

type ThemeStore = {
  name: string;
} & Theme;

const initialState: ThemeStore = (() => {
  const savedTheme = sessionStorage.getItem('theme');
  if (savedTheme && ThemeService.has(savedTheme)) {
    return {
      name: savedTheme,
      ...ThemeService.getTheme(savedTheme),
    };
  }
  return {
    name: config.settings.defaultTheme,
    ...ThemeService.getTheme(config.settings.defaultTheme),
  };
})();

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setActiveTheme: (state, action: PayloadAction<string>) => {
      const t = action.payload;
      if (ThemeService.has(t)) {
        const { background, text, button, input, border } =
          ThemeService.getTheme(t);
        state.background = background;
        state.text = text;
        state.button = button;
        state.input = input;
        state.border = border;
        state.name = t;

        sessionStorage.setItem('theme', t);
      } else if (t === 'custom') {
        state.name = t;
      }
    },
    setCustomTheme: (state, action: PayloadAction<Theme>) => {
      if (state.name === 'custom') {
        state.background = action.payload.background;
        state.text = action.payload.text;
      }
    },
  },
});

export default ThemeSlice.reducer;

export const { setActiveTheme, setCustomTheme } = ThemeSlice.actions;

export const getThemeOptions = createSelector(
  (state: RootState) => state.app.themes.name,
  () => ThemeService.getAll(),
  (activeTheme, allThemes) => ({
    active: activeTheme,
    all: [...allThemes],
  })
);

export const getTheme = createSelector(
  [(state: RootState) => state.app.themes],
  ({ background, text, button, input, border }) => ({
    background,
    text,
    button,
    input,
    border,
  })
);
