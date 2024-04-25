import React, { SVGProps } from 'react';

interface ISuccessIconProps extends SVGProps<SVGSVGElement> {
  size?: string;
  fill?: string;
  className?: string;
}

const SuccessIcon = ({
  size = '20',
  fill = '#079015',
  className,
  ...props
}: ISuccessIconProps) => (
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
      fill={fill}
      d="M10 0C4.48 0 0 4.48 0 10s4.48 10 10 10 10-4.48 10-10S15.52 0 10 0Zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm3.88-11.71L8 12.17l-1.88-1.88a.996.996 0 1 0-1.41 1.41l2.59 2.59c.39.39 1.02.39 1.41 0L15.3 7.7a.996.996 0 0 0 0-1.41c-.39-.39-1.03-.39-1.42 0Z"
    />
  </svg>
);

export default SuccessIcon;
