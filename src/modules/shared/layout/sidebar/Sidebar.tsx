import React from 'react';
import cn from 'classnames';
import { Theme } from '../theme';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

/**
 * Sidebar Component
 *
 * This component is designed to wrap content that should be displayed in the sidebar of the application.
 * It applies the sidebar theme from the `Theme` layout.
 * The `children` prop can be either a single ReactNode or an array of ReactNodes and
 * represents the content to be displayed in the sidebar.
 * The `className` prop is optional and allows additional CSS classes to be applied to the sidebar for custom styling. By default, the sidebar takes up 1/6th of the viewport width and spans the entire height of the viewport.
 */
const Sidebar = ({ children, className }: Props) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      className={cn(
        'h-[calc(100vh-55px)] w-1/6 flex-shrink-0 border-r-[2px]',
        className
      )}
      style={{
        borderColor: theme.background.topbar,
      }}
    >
      <Theme.Sidebar>{children}</Theme.Sidebar>
    </div>
  );
};
export default Sidebar;
