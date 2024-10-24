import React from 'react';
import { supportColors } from '../../../constants/theme';

interface Props {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
}

const ErrorText = ({ children, className }: Props) => (
  <div className={className} style={{ color: supportColors.red }}>
    {children}
  </div>
);

export default ErrorText;
