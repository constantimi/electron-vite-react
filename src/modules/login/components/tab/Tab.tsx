import React from 'react';
import { Theme } from '../../../shared/layout/theme';

type Props = {
  onClick?: () => void;
  active?: boolean;
  children?: React.ReactNode;
};

const Tab = ({ onClick, active, children }: Props) =>
  active ? (
    <Theme.PrimaryButton
      buttonClassName="rounded-lg"
      className="h-[2.5rem] w-full"
      onClick={onClick}
    >
      {children}
    </Theme.PrimaryButton>
  ) : (
    <Theme.DefaultButton className="h-[2.5rem] w-full" onClick={onClick}>
      {children}
    </Theme.DefaultButton>
  );

export default Tab;
