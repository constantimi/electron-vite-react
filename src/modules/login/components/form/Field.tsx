import React, { ChangeEvent } from 'react';
import { Theme } from '../../../shared/layout/theme';
import WarningIcon from '../../../shared/components/icons/WarningIcon';
import { supportColors } from '../../../shared/constants/theme';
import { useAppSelector } from '../../../shared/store/hooks';
import { getTheme } from '../../../shared/store/app/theme';

type FieldProps = {
  dataTestId?: string;
  label?: string;
  placeholder: string;
  errorMessage?: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (value: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value?: string;
};

const Field = ({
  dataTestId,
  label,
  placeholder,
  errorMessage,
  onChange,
  onBlur,
  onKeyDown,
  disabled,
  value,
}: FieldProps) => {
  // =====================================================================
  // states

  const theme = useAppSelector(getTheme);

  return (
    <>
      {label && (
        <div className="flex w-full flex-shrink-0 justify-start">
          <Theme.PrimaryText className="text-base">{label}</Theme.PrimaryText>
        </div>
      )}
      <Theme.PrimaryInput
        id="email"
        className="flex h-[3.5rem] w-full border-[1px] text-sm"
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        dataTestId={dataTestId}
        disabled={disabled}
        val={value}
        style={{
          borderColor: theme.border.primary,
          backgroundColor: theme.background.main,
        }}
      />
      <div className="mb-2 flex h-[1.2rem] w-full flex-shrink-0 items-center justify-start">
        {errorMessage && (
          <div className="flex flex-row items-center gap-1">
            <WarningIcon fill={supportColors.light.red} />
            <Theme.ErrorText className="text-sm">
              {errorMessage}
            </Theme.ErrorText>
          </div>
        )}
      </div>
    </>
  );
};

export default Field;
