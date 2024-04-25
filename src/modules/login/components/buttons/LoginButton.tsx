import React from 'react';
import cn from 'classnames';
import { Theme } from '../../../shared/layout/theme';
import LoadingIcon from '../../../shared/components/icons/LoadingIcon';

type LoginButtonProps = {
  dataTestId?: string;
  isLoading?: boolean;
  className?: string;
  placeholder: string;
  onClick: () => void;
};

const LoginButton = ({
  dataTestId,
  onClick,
  placeholder,
  isLoading,
  className,
}: LoginButtonProps) => (
  <Theme.PrimaryButton
    className={cn('h-[3.5rem] w-[26rem]', className)}
    onClick={onClick}
    dataTestId={dataTestId}
  >
    {!isLoading ? placeholder : <LoadingIcon />}
  </Theme.PrimaryButton>
);

export default LoginButton;
