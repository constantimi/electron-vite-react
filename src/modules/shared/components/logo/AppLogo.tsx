import React from 'react';
import { useNavigate } from 'react-router';
import { Theme } from '../../layout/theme';
import { getThemeOptions } from '../../store/app/theme';
import { useAppSelector } from '../../store/hooks';
import { Mode } from '../../types/theme';
import config from '../../config/config';

const AppLogo: React.FC = () => {
  const navigate = useNavigate();
  const { active } = useAppSelector(getThemeOptions);

  const src =
    active === Mode.DARK ? config.app.icon.dark : config.app.icon.light;

  return (
    <button
      type="button"
      onClick={() => navigate(`/`)}
      className="flex flex-row items-center gap-2"
    >
      <img src={src} alt={config.app.name} className="h-8 w-8" />
      <Theme.PrimaryText className="flex-shrink-0 !text-[1.5rem] font-normal">
        {config.app.name}
      </Theme.PrimaryText>
    </button>
  );
};

export default AppLogo;
