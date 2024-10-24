import { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: string;
  fill?: string;
  className?: string;
}
