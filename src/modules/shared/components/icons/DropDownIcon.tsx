import * as React from 'react';
import { IconProps } from '../../types/icon';

const DropDownIcon = ({
  size = '24',
  fill = '#9FA9CA',
  className,
  ...props
}: IconProps) => (
  <svg
    width={size}
    height={size}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <g clipPath="url(#dropIcon)">
      <path
        fill={fill}
        d="m8.71 11.71 2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71Z"
      />
    </g>
    <defs>
      <clipPath id="dropIcon">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default DropDownIcon;
