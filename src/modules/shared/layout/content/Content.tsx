import React from 'react';
import cn from 'classnames';
import { Theme } from '../theme';

type Props = {
  children: React.ReactNode[] | React.ReactNode;
  className?: string;
};

/**
 * Content Component
 * This component is designed to wrap the main content of the application.
 * It applies the background theme from the `Theme` layout.
 * The `children` prop can be either a single ReactNode or an array of
 * ReactNodes and represents the main content to be displayed in the application.
 * The `className` prop is optional and allows additional CSS classes to be applied
 * to the content container for custom styling. By default, the content container takes up
 * the full width and spans the entire height of the viewport.
 */
const Content = ({ children, className }: Props) => (
  <div
    className={cn('h-full w-full overflow-x-auto', className)}
    data-testid="content"
  >
    <Theme.Background>{children}</Theme.Background>
  </div>
);

export default Content;