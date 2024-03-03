import React, { ChangeEvent, forwardRef } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

type Props = {
  className?: string;
  placeholder: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onBlur?: (value: string) => void;
  defaultVal?: string;
  val?: string;
  name?: string;
  dataTestId?: string;
  id?: string;
  type?: string;
  disabled?: boolean;
  clearOnFocus?: boolean;
  style?: React.CSSProperties;
};

const SecondaryInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,
      placeholder,
      onChange,
      onKeyUp,
      onBlur,
      onKeyDown,
      defaultVal,
      val,
      name,
      dataTestId,
      id,
      type = 'text',
      disabled = false,
      clearOnFocus = false,
      style,
    },
    ref
  ) => {
    // =====================================================================
    // states

    const theme = useAppSelector(getTheme);

    const inputClassNames = cn(
      'flex items-center justify-center rounded px-4 my-1 flex-shrink-0',
      className
    );

    // =====================================================================
    // handle

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!clearOnFocus) return;
      e.target.placeholder = '';
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) onBlur(e.target.value);
      if (!clearOnFocus) return;
      e.target.placeholder = placeholder;
    };

    return (
      <>
        <style>
          {`
            input::placeholder {
              color: ${theme.text.disabled};
              opacity: 1;
            }

            input::-ms-input-placeholder { /* Edge 12 -18 */
              color: ${theme.text.disabled};
            }
        `}
        </style>
        <input
          ref={ref}
          id={id}
          className={inputClassNames}
          style={{
            backgroundColor: disabled
              ? theme.background.main
              : theme.input.secondary,
            color: theme.text.secondary,
            ...style,
          }}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          defaultValue={defaultVal}
          value={val}
          name={name}
          data-testid={dataTestId}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </>
    );
  }
);

export default SecondaryInput;
