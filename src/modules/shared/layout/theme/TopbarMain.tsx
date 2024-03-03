import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

const TopbarMain = ({ children, className }: Props) => {
  const theme = useAppSelector(getTheme);

  let topbarMainStyle = {
    backgroundColor: '#FFFFFF',
  };

  if (theme !== null && theme !== undefined) {
    topbarMainStyle = {
      backgroundColor: theme.background.topbar,
    };
  }

  return (
    <div
      className={cn('h-full w-full', className)}
      style={topbarMainStyle}
      data-testid="topbarMain"
    >
      {children}
    </div>
  );
};

export default TopbarMain;
