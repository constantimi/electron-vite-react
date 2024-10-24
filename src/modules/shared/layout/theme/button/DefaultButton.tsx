import cn from 'classnames';
import React, { CSSProperties, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

interface Props {
  className?: string;
  children: React.ReactNode | React.ReactNode[] | string;
  disable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onBlur?: (e: React.FocusEvent<HTMLButtonElement>) => void;
  onTouch?: (e: React.TouchEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  dataTestId?: string;
  style?: CSSProperties;
  ref?: React.LegacyRef<HTMLButtonElement>;
}

const DefaultButton = ({
  className,
  onClick,
  onBlur,
  onTouch,
  onMouseEnter,
  onMouseLeave,
  children,
  disable,
  dataTestId,
  style,
  ref,
  ...props
}: Props) => {
  const theme = useAppSelector(getTheme);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    setHovered(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    setHovered(false);
    onMouseLeave?.(e);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex flex-shrink-0 items-center justify-center rounded text-base',
        className
      )}
      style={{
        color: disable ? theme.text.disabled : theme.text.primary,
        borderColor: disable
          ? theme.text.disabled
          : hovered
          ? theme.text.primary
          : theme.border.secondary,
        ...style,
      }}
      disabled={disable}
      onClick={onClick}
      onBlur={onBlur}
      onTouchEnd={onTouch}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={dataTestId}
      {...props}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
