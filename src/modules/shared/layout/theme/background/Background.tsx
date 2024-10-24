import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const Background = ({ children, className }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn('scrollbar h-full w-full overflow-y-auto pb-4', className)}
      style={{ backgroundColor: theme.background.main }}
    >
      {children}
    </div>
  );
};
export default Background;
