import React from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getTheme,
  getThemeOptions,
  setActiveTheme,
} from '../../store/app/theme';
import LightModeIcon from '../icons/LightModeIcon';
import DarkModeIcon from '../icons/DarkModeIcon';
import { Mode } from '../../types/theme';

const ThemeToggle = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(getTheme);
  const { active } = useAppSelector(getThemeOptions);

  const toggleTheme = () => {
    dispatch(setActiveTheme(active === Mode.DARK ? Mode.LIGHT : Mode.DARK));
  };

  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={toggleTheme}
        className={cn(
          'h-6 w-12 rounded-full p-1 transition-colors duration-300'
        )}
        style={{
          backgroundColor: theme.input.primary,
        }}
      >
        <div
          className={cn(
            'flex h-4 w-4 transform items-center justify-center rounded-full shadow-md transition-transform duration-300',
            active === Mode.DARK ? 'translate-x-6' : 'translate-x-0'
          )}
          style={{
            backgroundColor: theme.background.topbar,
          }}
        >
          {active === Mode.DARK ? (
            <DarkModeIcon fill={theme.text.primary} />
          ) : (
            <LightModeIcon fill={theme.text.primary} />
          )}
        </div>
      </button>
    </div>
  );
};

export default ThemeToggle;
