import React from 'react';
import cn from 'classnames';
import { Theme } from '../theme';
import { getTheme } from '../../store/app/theme';
import { useAppSelector } from '../../store/hooks';

type Props = {
  children?: React.ReactNode[] | React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Sidebar Component
 *
 * This component is designed to wrap all the elements of the sidebar of the application.
 * It applies a theme background, so when using this component, there's no need to manually set a background color
 * as it's already defined by the theme.
 * The `children` prop can be a single ReactNode and represents the content to be displayed
 * in the sidebar.
 *
 */
const Sidebar = ({ children, className, style }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <Theme.Sidebar
      className={cn('border-r-[0.5px]', className)}
      style={{ borderColor: theme.border.primary, ...style }}
    >
      {children}
    </Theme.Sidebar>
  );
};

export default Sidebar;
