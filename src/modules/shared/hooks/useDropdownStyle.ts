import { StylesConfig } from 'react-select';
import { useAppSelector } from '../store/hooks';
import { getTheme } from '../store/app/theme';
import { OptionType } from '../types/options';

export const useDropdownStyle = <T extends OptionType>() => {
  const theme = useAppSelector(getTheme);

  const dropdownStyle: StylesConfig<T> = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: '0.25rem',
      borderColor: state.isFocused
        ? theme.input.secondary
        : theme.input.primary,
      display: 'flex',
      backgroundColor: theme.input.primary,
      color: theme.text.primary,
      fontSize: '12px',
      outline: 'none',
      boxShadow: 'none',
      minHeight: '0px',
    }),
    option: (provided, state) => ({
      ...provided,
      color: theme.text.primary,
      backgroundColor: state.isSelected
        ? theme.background.main
        : theme.background.sidebar,
      ':hover': {
        backgroundColor: state.isFocused
          ? theme.background.main
          : theme.background.sidebar,
      },
      fontSize: '12px',
      className: 'scrollbar',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.background.sidebar,
      borderRadius: '0.25rem',
      borderColor: theme.border.primary,
      borderStyle: 'solid',
      borderWidth: '1px',
      zIndex: 20,
      right: '0',
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 20,
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme.text.primary,
    }),
    placeholder: (styles) => ({
      ...styles,
      paddingInline: '2px',
      color: theme.text.secondary,
      fontSize: '12px',
    }),
    loadingMessage: (styles) => ({
      ...styles,
      backgroundColor: theme.background.sidebar,
    }),
    noOptionsMessage: (styles) => ({
      ...styles,
      backgroundColor: theme.background.sidebar,
    }),
  };

  return { dropdownStyle };
};
