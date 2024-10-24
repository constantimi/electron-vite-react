import React, { CSSProperties, useState } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

interface Props {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode | React.ReactNode[];
  disable?: boolean;
  style?: CSSProperties;
  dataTestId?: string;
  ref?: React.LegacyRef<HTMLButtonElement>;
}

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

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'flex flex-shrink-0 items-center justify-center rounded text-base',
        className
      )}
      style={{ ...buttonStyle, ...style }}
      disabled={disable}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={dataTestId}
      {...props}
    >
      <div
        style={{
          color: theme.text.button,
        }}
        className="flex flex-shrink-0 flex-row items-center gap-2"
      >
        {children}
      </div>
    </button>
  );
};

export default PrimaryButton;
