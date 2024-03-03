import React, { CSSProperties, useState } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

type Props = {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode | React.ReactNode[];
  disable?: boolean;
  style?: CSSProperties;
  dataTestId?: string;
  ref?: React.LegacyRef<HTMLButtonElement>;
};

const PrimaryButton = ({
  className,
  onClick,
  children,
  disable,
  dataTestId,
  style,
  ref,
  ...props
}: Props) => {
  // =====================================================================
  // states

  const theme = useAppSelector(getTheme);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const buttonStyle = {
    backgroundColor: disable ? theme.button.disabled : theme.button.color,
    ...(hovered && {
      backgroundColor: disable ? theme.button.disabled : theme.button.hover,
    }),
  };

  const childrenClassName = cn(
    'flex items-center flex-shrink-0',
    { 'justify-center': className && !/justify-/.test(className) },
    className
  );

  return (
    <button
      ref={ref}
      className="flex h-fit flex-shrink-0 items-center justify-center rounded text-base"
      style={{ ...buttonStyle, ...style }}
      disabled={disable}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      type="button"
      data-testid={dataTestId}
      {...props}
    >
      <div
        style={{
          color: theme.text.buttonHover,
        }}
        className={childrenClassName}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement, {
                fill: theme.text.buttonHover,
              })
            : child
        )}
      </div>
    </button>
  );
};

export default PrimaryButton;
