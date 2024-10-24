import * as React from 'react';
import { IconProps } from '../../types/icon';

const ToastWarningIcon = ({
  size = '16',
  fill = '#FA0',
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
      d="M10 5c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V6c0-.55.45-1 1-1Zm-.01-5C4.47 0 0 4.48 0 10s4.47 10 9.99 10C15.52 20 20 15.52 20 10S15.52 0 9.99 0ZM10 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8Zm1-3H9v-2h2v2Z"
      fill={fill}
    />
  </svg>
);

export default ToastWarningIcon;
