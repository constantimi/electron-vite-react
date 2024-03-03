import React, { useState } from 'react';
import cn from 'classnames';
import { useLocation } from 'react-router';
import { Theme } from '../theme';

type Props = {
  isSidebarOpen: boolean;
  title: string;
  Icon: React.FC<{ size?: string; fill?: string; className?: string }>;
  onClick?: (slug?: string) => void;
  url?: string;
  disable?: boolean;
  className?: string;
  buttonClassName?: string;
};

const SidebarItem = ({
  isSidebarOpen,
  title,
  Icon,
  onClick,
  url,
  disable,
  className,
  buttonClassName,
}: Props) => {
  // =====================================================================
  // states

  const [isHovered, setIsHovered] = useState(false);
  const currentRoute = useLocation();

  const handleItemClick = () => {
    if (onClick) {
      onClick(url);
    }
  };

  return (
    <Theme.DefaultButton
      disable={disable}
      className={cn(
        'h-[28px] w-full cursor-pointer items-center justify-start gap-4 text-left text-sm',
        className
      )}
      buttonClassName={cn('w-full rounded-none relative', buttonClassName)}
      dataTestId={title}
      onClick={handleItemClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* line */}
      <div
        className={cn(
          'absolute left-1/2 h-[26px] -translate-x-1/2 rounded-sm',
          {
            'w-[96%]': isSidebarOpen && !disable,
            'w-[76%]': !isSidebarOpen && !disable,
          },
          {
            'bg-zinc-400 bg-opacity-20':
              currentRoute.pathname === url || isHovered,
          }
        )}
      />

      <Icon className="flex-shrink-0" />
      {isSidebarOpen && title}
    </Theme.DefaultButton>
  );
};
export default SidebarItem;
