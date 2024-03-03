import React from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  dataTestId?: string;
};

const BackgroundMain = ({ children, className, dataTestId }: Props) => {
  const theme = useAppSelector(getTheme);

  let backgroundMainStyle = {
    backgroundColor: '#FFFFFF',
  };

  if (theme !== null && theme !== undefined) {
    backgroundMainStyle = {
      backgroundColor: theme.background.main,
    };
  }

  return (
    <div
      className={cn('scrollbar h-full w-full overflow-y-auto', className)}
      style={backgroundMainStyle}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};
export default BackgroundMain;
