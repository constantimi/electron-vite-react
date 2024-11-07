import { createContext } from 'react';
import { Theme } from '../../types/theme';

interface ThemeContext {
  active: Theme;
  setActiveTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContext>({
  active: Theme.SYSTEM,
  setActiveTheme: () => null,
});
