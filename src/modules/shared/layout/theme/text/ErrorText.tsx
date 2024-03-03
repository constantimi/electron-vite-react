import React from 'react';
import { supportColors } from '../../../constants/theme';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
  dataTestId?: string;
};

const ErrorText = ({ children, className, dataTestId }: Props) => (
  <div
    className={className}
    data-testid={dataTestId}
    style={{ color: supportColors.light.red }}
  >
    {children}
  </div>
);

export default ErrorText;
