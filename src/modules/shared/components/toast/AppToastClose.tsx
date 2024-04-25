import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

import CloseIcon from '../icons/CloseIcon';

const AppToastClose = () => {
  const theme = useAppSelector(getTheme);

  return (
    <CloseIcon
      size="17"
      className="absolute right-1 top-1"
      fill={theme.text.primary}
    />
  );
};

export default AppToastClose;
