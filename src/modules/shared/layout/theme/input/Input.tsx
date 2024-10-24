import React, { ChangeEvent } from 'react';
import cn from 'classnames';
import { useAppSelector } from '../../../store/hooks';
import { getTheme } from '../../../store/app/theme';

interface Props {
  className?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  id?: string;
  type?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Input = ({
  id,
  type = 'text',
  name,
  placeholder,
  value,
  style,
  className,
  onChange,
  onBlur,
  disabled = false,
  ...props
}: Props) => {
  const theme = useAppSelector(getTheme);

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

            input[type="date"]::-webkit-calendar-picker-indicator {
              color: red;
            }
        `}
      </style>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        className={cn(
          'flex flex-shrink-0 items-center justify-center rounded px-4',
          className
        )}
        style={{
          backgroundColor: disabled
            ? theme.input.primary
            : theme.background.main,
          color: theme.text.primary,
          ...style,
        }}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        {...props}
      />
    </>
  );
};

export default Input;
