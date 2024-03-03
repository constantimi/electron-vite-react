import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

const SidebarMain = ({ children, className }: Props) => {
  const theme = useAppSelector(getTheme);

  let sidebarMainStyle = {
    backgroundColor: '#FFFFFF',
  };

  if (theme !== null && theme !== undefined) {
    sidebarMainStyle = {
      backgroundColor: theme.background.sidebar,
    };
  }

  return (
    <div
      className={cn('h-[100%] w-full', className)}
      style={sidebarMainStyle}
      data-testid="sidebarMain"
    >
      {children}
    </div>
  );
};

export default SidebarMain;
