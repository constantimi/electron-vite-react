import React from 'react';
import { useNavigate } from 'react-router';
import { Theme } from '../../types/theme';
import { useTheme } from '../../context/theme/ThemeProvider';
import config from '../../config/config';

const AppLogo = () => {
  const navigate = useNavigate();

  const { active } = useTheme();

  const src =
    active === Theme.DARK ? config.app.icon.dark : config.app.icon.light;

  return (
    <button
      type="button"
      onClick={() => navigate(`/`)}
      className="flex flex-row items-center gap-2"
    >
      <img src={src} alt={config.app.name} className="h-8 w-8" />
    </button>
  );
};

export default AppLogo;
