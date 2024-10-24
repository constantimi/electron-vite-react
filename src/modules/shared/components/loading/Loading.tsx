import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children?: React.ReactNode;
};

const Loading = ({ children }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      data-testid="center-outer-container"
      className="flex h-full w-full flex-col items-center justify-center overflow-auto"
      style={{ background: theme.background.main }}
    >
      <div
        data-testid="center-inner-container"
        className="flex flex-col items-center justify-center p-4"
      >
        {children}
      </div>
    </div>
  );
};

export default Loading;
