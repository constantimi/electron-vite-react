import cn from 'classnames';
import React, { ReactNode } from 'react';

type FormProps = {
  children: ReactNode | ReactNode[];
  className?: string;
};

const Form = ({ children, className }: FormProps) => (
  <div
    className={cn('flex flex-shrink-0 items-center justify-center', className)}
    data-testid="form"
  >
    {children}
  </div>
);

export default Form;
