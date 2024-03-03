import cn from 'classnames';
import React, { CSSProperties, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

type Props = {
  className?: string;
  buttonClassName?: string;
  children: React.ReactNode | React.ReactNode[] | string;
  disable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onTouch?: (e: React.TouchEvent<HTMLButtonElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLElement>) => void;
  dataTestId?: string;
  style?: CSSProperties;
  buttonRef?: React.LegacyRef<HTMLButtonElement>;
};

const DefaultButton = ({
  className,
  buttonClassName,
  onClick,
  onTouch,
  onMouseEnter,
  onMouseLeave,
  children,
  disable,
  dataTestId,
  style,
  buttonRef,
  ...props
}: Props) => {
  // =====================================================================
  // states

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

  const childrenClass = cn(
    'flex flex-row items-center whitespace-nowrap',
    { 'justify-center': className && !/justify-/.test(className) },
    className
  );

  const buttonClass = cn(
    'flex h-fit items-center rounded text-base',
    buttonClassName
  );

  return (
    <button
      ref={buttonRef}
      className={buttonClass}
      style={{ ...style }}
      disabled={disable}
      onClick={onClick}
      onTouchEnd={onTouch}
      onMouseEnter={(e) => handleMouseEnter(e)}
      onMouseLeave={handleMouseLeave}
      type="button"
      data-testid={dataTestId}
      {...props}
    >
      <div
        style={{
          color: disable ? theme.text.disabled : theme.text.primary,
          borderColor: disable
            ? theme.text.disabled
            : hovered
            ? theme.text.buttonHover
            : theme.text.primary,
        }}
        className={childrenClass}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement, {
                fill: disable ? theme.text.disabled : theme.text.primary,
              })
            : child
        )}
      </div>
    </button>
  );
};

export default DefaultButton;
