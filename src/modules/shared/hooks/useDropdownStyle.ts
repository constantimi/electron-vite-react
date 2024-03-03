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

  const creatableStyle: StylesConfig<T> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: theme.input.primary,
      borderRadius: '5px',
      color: 'red',
      border: 'none',
      ':focus': {
        outline: 'none',
        border: 'none',
      },
      maxWidth: '557px',
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
    input: (styles) => ({
      ...styles,
      color: theme.text.primary,
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingInline: '10px',
    }),
    placeholder: (styles) => ({
      ...styles,
      paddingInline: '10px',
      color: theme.text.primary,
      fontSize: '12px',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme.background.main,
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
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: theme.background.main,
      borderRadius: '20px',
      lineHeight: 1,
      padding: '2px 10px 3px',
      alignItems: 'center',
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: theme.text.primary,
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      background: theme.text.primary,
      borderRadius: '50%',
      height: '3px',
      width: '3px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: '-20px !important',
      padding: '2px',
      marginLeft: '5px',
      color: theme.text.primary,
      ':hover': {
        color: theme.text.primary,
        backgroundColor: theme.input.primary,
      },
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

  return { dropdownStyle, creatableStyle };
};
