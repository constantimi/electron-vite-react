import React, { SVGProps } from 'react';

interface IErrorIconProps extends SVGProps<SVGSVGElement> {
  width?: string;
  height?: string;
  fill?: string;
  className?: string;
}

const ErrorIcon = ({
  width = '23',
  height = '20',
  fill = '#CF0000',
  className,
  ...props
}: IErrorIconProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 23 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="m11.5 2.739 8.471 14.636H3.03L11.5 2.739ZM1.083 16.25c-.867 1.496.213 3.375 1.946 3.375H19.97c1.733 0 2.813-1.879 1.947-3.375L13.446 1.614c-.866-1.496-3.026-1.496-3.892 0L1.083 16.25Zm9.292-7.875v2.25c0 .619.506 1.125 1.125 1.125s1.125-.506 1.125-1.125v-2.25c0-.619-.506-1.125-1.125-1.125s-1.125.506-1.125 1.125Zm0 5.625h2.25v2.25h-2.25V14Z"
      fill={fill}
    />
  </svg>
);

export default ErrorIcon;
