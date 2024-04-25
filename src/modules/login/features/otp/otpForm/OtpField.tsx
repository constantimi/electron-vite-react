import React, { forwardRef } from 'react';
import cn from 'classnames';
import { Theme } from '../../../../shared/layout/theme';
import { useAppSelector } from '../../../../shared/store/hooks';
import { getTheme } from '../../../../shared/store/app/theme';
import { supportColors } from '../../../../shared/constants/theme';

type ClipboardProps = {
  val: string;
  err: boolean;
  name?: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const OtpField = forwardRef<HTMLInputElement, ClipboardProps>(
  ({ val, onKeyUp, name, err }, ref) => {
    // =====================================================================
    // states

    const theme = useAppSelector(getTheme);

    const otpClassName = cn(
      'flex-shrink-0 rounded flex items-center justify-center',
      'w-[3rem] h-14 mx-1.5 border-[1px]',
      'text-center uppercase text-md'
    );

    return (
      <Theme.PrimaryInput
        ref={ref}
        placeholder=""
        className={otpClassName}
        onKeyUp={onKeyUp}
        name={name}
        val={val}
        dataTestId={name}
        style={{
          borderColor: err ? supportColors.light.red : theme.border.primary,
          backgroundColor: theme.background.main,
        }}
      />
    );
  }
);

export default OtpField;
