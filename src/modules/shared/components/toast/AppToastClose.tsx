import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';
import ToastCloseIcon from '../icons/ToastCloseIcon';

const AppToastClose = () => {
  const theme = useAppSelector(getTheme);

  return (
    <ToastCloseIcon
      size="15"
      className="absolute right-1 top-1"
      fill={theme.text.primary}
    />
  );
};

export default AppToastClose;
