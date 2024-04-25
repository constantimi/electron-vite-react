import React from 'react';
import cn from 'classnames';
import AppIcon from '../app/AppIcon';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  className?: string;
};

const Loading = ({ className }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      data-testid="center-outer-container"
      className="flex h-[100vh] w-full flex-col items-center justify-center overflow-auto"
      style={{ background: theme.background.main }}
    >
      <div
        data-testid="center-inner-container"
        className="flex flex-col items-center justify-center p-4"
      >
        <AppIcon className={cn('h-[60px] w-[60px] animate-pulse', className)} />
      </div>
    </div>
  );
};

export default Loading;
