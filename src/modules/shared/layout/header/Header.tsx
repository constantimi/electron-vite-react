import React from 'react';
import { Theme } from '../theme';

type Props = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Header Component
 *
 * This component is designed to wrap all the headers of the application.
 * It applies a theme background, so when using this component, there's no need to manually set a background color
 * as it's already defined by the theme.
 * The `children` prop can be a single ReactNode and represents the content to be displayed
 * in the header. The height of the header is set to 10% of the viewport height.
 * This component utilizes the `Topbar` component from the theme layout to apply the theme
 * background.
 *
 */
const Header = ({ children, className }: Props) => (
  <Theme.Topbar className={className}>{children}</Theme.Topbar>
);

export default Header;
