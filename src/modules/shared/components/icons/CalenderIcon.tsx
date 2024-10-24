import * as React from 'react';
import { IconProps } from '../../types/icon';

const CalenderIcon = ({
  size = '15',
  fill = '#9FA9CA',
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 2H15V0H13V2H5V0H3V2H2C0.89 2 0.01 2.9 0.01 4L0 18C0 19.1 0.89 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM16 7V18H2V7H16ZM9 9H4V14H9V9Z"
      fill={fill}
    />
  </svg>
);

export default CalenderIcon;
