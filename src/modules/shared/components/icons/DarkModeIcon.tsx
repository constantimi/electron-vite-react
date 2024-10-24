import * as React from 'react';
import { IconProps } from '../../types/icon';

const DarkModeIcon = ({
  size = '10',
  fill = '#f4f6f8',
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
      fill={fill}
    />
  </svg>
);

export default DarkModeIcon;
