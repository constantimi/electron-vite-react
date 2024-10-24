import * as React from 'react';
import { IconProps } from '../../types/icon';

const WarningIcon = ({
  size = '12',
  fill = '#F57E77',
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M5.75 0.675049C2.645 0.675049 0.125 3.19505 0.125 6.30005C0.125 9.40505 2.645 11.925 5.75 11.925C8.855 11.925 11.375 9.40505 11.375 6.30005C11.375 3.19505 8.855 0.675049 5.75 0.675049ZM5.75 6.86255C5.44062 6.86255 5.1875 6.60942 5.1875 6.30005V4.05005C5.1875 3.74067 5.44062 3.48755 5.75 3.48755C6.05937 3.48755 6.3125 3.74067 6.3125 4.05005V6.30005C6.3125 6.60942 6.05937 6.86255 5.75 6.86255ZM6.3125 9.11255H5.1875V7.98755H6.3125V9.11255Z"
      fill={fill}
    />
  </svg>
);

export default WarningIcon;
