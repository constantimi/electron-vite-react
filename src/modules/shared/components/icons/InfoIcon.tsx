import React, { SVGProps } from 'react';

interface IInfoIconProps extends SVGProps<SVGSVGElement> {
  size?: string;
  fill?: string;
  className?: string;
}

const InfoIcon = ({
  size = '20',
  fill = '#007BC7',
  className,
  ...props
}: IInfoIconProps) => (
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
      d="M10 15c-.55 0-1-.45-1-1v-4c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1Zm.01 5C15.53 20 20 15.52 20 10S15.53 0 10.01 0C4.48 0 0 4.48 0 10s4.48 10 10.01 10ZM10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8ZM9 5h2v2H9V5Z"
      fill={fill}
    />
  </svg>
);

export default InfoIcon;
