import React, { createContext, useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import Datepicker from 'react-datepicker';
import { getTheme } from '../../store/app/theme';
import { useAppSelector } from '../../store/hooks';
import { Theme } from '../../layout/theme';
import { supportColors } from '../../constants/theme';

import 'react-datepicker/dist/react-datepicker.css';
import CalenderIcon from '../icons/CalenderIcon';
import WarningIcon from '../icons/WarningIcon';

const PlaceholderContext = createContext<string | undefined>('Choose a date');

interface CustomInputProps {
  label?: string;
  value?: string;
  error?: string | null;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CustomInput = React.forwardRef<HTMLButtonElement, CustomInputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ label, value, error, onClick }, _) => {
    const theme = useAppSelector(getTheme);
    const placeholder = useContext(PlaceholderContext);

    return (
      <>
        <style>
          {`
            .react-datepicker-wrapper {
              width: 100%;
            }

            .calendar {
              border: 1px solid ${theme.border.primary};
            }

            .calendar__day {
              color: ${theme.text.primary};
            }

            .calendar__day:hover {
              background-color: ${theme.button.color};
              color: ${theme.text.secondary};
            }

            .react-datepicker__current-month,
            .calendar__weekday,
            .react-datepicker__header,
            .react-datepicker__month-select,
            .react-datepicker__year-select,
            .calendar {
              color: ${theme.text.primary};
              background-color: ${theme.background.main};
              outline: none;
            }

            .react-datepicker__year-select {
              padding: 0.8rem;
            }

            .react-datepicker__triangle::after {
              border-color: ${theme.background.main} transparent transparent transparent !important;
            }

            .react-datepicker__day--today {
              background-color: ${theme.text.disabled};
              color: ${theme.background.main};
              font-weight: normal;
            }

            .react-datepicker__day:hover {
              color: ${theme.text.primary};
            }

            .react-datepicker__day--selected {
              background-color: ${theme.button.color};
              color: ${theme.background.main};
              font-weight: normal;
              border: none;
            }
              
            .react-datepicker__day--selected:hover {
              color: ${theme.background.main};
              font-weight: normal;
              border: none;
            }
            `}
        </style>
        {label && (
          <div className="flex w-full flex-shrink-0 justify-start">
            <Theme.PrimaryText className="text-base">{label}</Theme.PrimaryText>
          </div>
        )}
        <Theme.DefaultButton
          onClick={onClick}
          className={cn(
            'flex flex-shrink-0 items-center justify-center rounded-md',
            'h-[2.5rem] w-full cursor-pointer border-[1px] px-4'
          )}
          style={{
            backgroundColor: theme.background.main,
            borderColor: error ? supportColors.red : theme.border.primary,
          }}
        >
          <span
            className="flex flex-1 text-left text-base"
            style={{
              color: value ? theme.text.primary : theme.text.disabled,
            }}
          >
            {value || placeholder}
          </span>

          <CalenderIcon fill={theme.text.primary} />
        </Theme.DefaultButton>

        <div className="flex h-[1.5rem] w-full flex-shrink-0 items-center justify-start">
          {error && (
            <div className="flex flex-row items-center gap-1">
              <WarningIcon fill={supportColors.red} />
              <Theme.ErrorText className="text-sm">{error}</Theme.ErrorText>
            </div>
          )}
        </div>
      </>
    );
  }
);

type Props = {
  placeholder?: string;
  onChange: (date: Date) => void;
  selectedDate: string;
  className?: string;
  error?: string | null;
  label?: string;
};

const DatepickerComponent = ({
  placeholder,
  onChange,
  selectedDate,
  className,
  error,
  label,
}: Props) => {
  const initialDate = selectedDate ? new Date(selectedDate) : null;
  const [defaultDate, setDefaultDate] = useState<Date | null>(initialDate);

  useEffect(() => {
    setDefaultDate(selectedDate ? new Date(selectedDate) : null);
  }, [selectedDate]);

  return (
    <div className={cn('flex w-full flex-col', className)}>
      <PlaceholderContext.Provider value={placeholder}>
        <Datepicker
          dateFormat="dd-MM-yyyy"
          selected={defaultDate}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          onChange={(date: Date | null, _) => {
            if (date) {
              onChange(date);
              setDefaultDate(date);
            }
          }}
          customInput={<CustomInput label={label} error={error} />}
          calendarClassName="calendar"
          dayClassName={() => 'calendar__day'}
          weekDayClassName={() => 'calendar__weekday'}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </PlaceholderContext.Provider>
    </div>
  );
};

export default DatepickerComponent;
