import React from 'react';
import cn from 'classnames';
import { getTheme } from '../../../store/app/theme';
import { useAppSelector } from '../../../store/hooks';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const Sidebar = ({ children, className, style }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn('w-full flex-shrink-0', className)}
      style={{
        backgroundColor: theme.background.sidebar,
        borderColor: theme.border.primary,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Sidebar;
