import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode | boolean;
};

const Center = ({ children }: Props) => (
  // Outer container for overflowing vertically when collapsing the content
  <div
    data-testid="center-outer-container"
    className="flex h-full w-full items-center justify-center overflow-auto"
  >
    {/* Inner container for vertical and horizontal centering */}
    <div
      data-testid="center-inner-container"
      className="flex max-h-full flex-col items-center p-4"
    >
      {children}
    </div>
  </div>
);

export default Center;
