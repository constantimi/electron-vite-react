import React from 'react';
import cn from 'classnames';
import config from '../../config/config';

type Props = {
  className?: string;
  alt?: string;
};

const AppIcon = ({ className, alt }: Props) => (
  <img
    src={config.appIcon}
    className={cn('h-[30px] w-[30px]', className)}
    alt={alt}
  />
);
export default AppIcon;
