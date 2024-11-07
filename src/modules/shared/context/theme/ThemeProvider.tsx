import React, {
  useEffect,
  useMemo,
  useState,
  ReactNode,
  useContext,
} from 'react';
import { useDispatch } from 'react-redux';
import { ThemeContext } from './ThemeContext';
import { updateTheme } from '../../store/app/theme/theme';
import { Theme } from '../../types/theme';
import config from '../../config/config';

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem('theme') as Theme) ||
      (config.settings.defaultTheme as Theme)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Theme.LIGHT, Theme.DARK);

    const appliedTheme =
      theme === Theme.SYSTEM
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? Theme.DARK
          : Theme.LIGHT
        : theme;

    root.classList.add(appliedTheme);

    dispatch(updateTheme(appliedTheme));
  }, [theme, dispatch]);

  const value = useMemo(
    () => ({
      active: theme,
      setActiveTheme: (t: Theme) => {
        localStorage.setItem('theme', t);
        setTheme(t);
      },
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider {...props} value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
