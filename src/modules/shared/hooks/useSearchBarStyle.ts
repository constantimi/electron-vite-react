import { StylesConfig } from 'react-select';
import { useAppSelector } from '../store/hooks';
import { getTheme } from '../store/app/theme';
import { SearchBarOptionType } from '../types/options';

export const useSearchBarStyle = <T>() => {
  const theme = useAppSelector(getTheme);

  const searchbarStyle: StylesConfig<SearchBarOptionType<T>> = {
    control: (styles) => ({
      ...styles,
      backgroundColor: theme.input.primary,
      padding: '7px 5px',
      height: '3rem',
      width: '600px',
      borderRadius: '8px',
      border: '0px',
      ':hover': {
        border: '0px',
        boxShadow: 'none',
      },
    }),
    option: (styles, { isFocused }) => ({
      ...styles,
      backgroundColor: isFocused
        ? theme.background.activeTab
        : theme.background.sidebar,
      color: theme.text.primary,
    }),
    input: (styles) => ({
      ...styles,
      color: theme.text.primary,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: theme.text.primary,
    }),
    menu: (styles) => ({
      ...styles,
    }),
    menuList: (provided) => ({
      ...provided,
      backgroundColor: theme.background.sidebar,
      borderRadius: '3px',
    }),
    valueContainer: (styles) => ({
      ...styles,
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    }),
  };
  return { searchbarStyle };
};
