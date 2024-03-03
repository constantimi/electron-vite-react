import React, { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  hoverState?: boolean;
  buttonState?: boolean;
  disable?: boolean;
  dataTestId?: string;
};

const PrimaryText = ({
  children,
  className,
  disable,
  hoverState = false,
  buttonState,
  dataTestId,
}: Props) => {
  // =====================================================================
  // states

  const theme = useAppSelector(getTheme);
  const [isHovered, setIsHovered] = useState(false);

  const textStyle = {
    color: disable
      ? theme.text.disabled
      : isHovered && hoverState
      ? theme.text.buttonHover
      : theme.text.primary,
  };

  const textButtonStyle = {
    color: disable ? theme.text.disabled : theme.text.buttonHover,
  };

  // =====================================================================
  // handle

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={className}
      style={buttonState ? textButtonStyle : textStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

export default PrimaryText;
