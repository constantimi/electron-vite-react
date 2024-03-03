import React, { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  hoverState?: boolean;
  dataTestId?: string;
};

const SecondaryText = ({
  children,
  className,
  hoverState,
  dataTestId,
}: Props) => {
  // =====================================================================
  // states

  const theme = useAppSelector(getTheme);
  const [isHovered, setIsHovered] = useState(false);

  const textStyle = {
    color:
      isHovered && hoverState ? theme.text.buttonHover : theme.text.secondary,
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
      style={textStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-testid={dataTestId}
    >
      {children}
    </div>
  );
};

export default SecondaryText;
