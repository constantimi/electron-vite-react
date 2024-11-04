import React from 'react';
import Select, {
  NoticeProps,
  StylesConfig,
  Props as SelectProps,
  components as SelectComponents,
} from 'react-select';
import { useDropdownStyle } from '../../hooks/useDropdownStyle';
import { OptionType } from '../../types/options';
import { useSharedTranslation } from '../../hooks/useSharedTranslation';
import { Theme } from '../../layout/theme';
import { useAppSelector } from '../../store/hooks';
import { getTheme } from '../../store/app/theme';
import DropDownIcon from '../icons/DropDownIcon';

export const NoOptionsMessage = <T extends OptionType>(
  props: NoticeProps<T>
) => {
  const { t } = useSharedTranslation();

  return (
    <SelectComponents.NoOptionsMessage {...props}>
      <Theme.PrimaryText className="text-sm">
        {t('No options')}
      </Theme.PrimaryText>
    </SelectComponents.NoOptionsMessage>
  );
};

export const LoadingMessage = <T extends OptionType>(props: NoticeProps<T>) => {
  const { t } = useSharedTranslation();

  return (
    <SelectComponents.LoadingMessage {...props}>
      <Theme.PrimaryText className="text-sm">
        {t('Loading ...')}
      </Theme.PrimaryText>
    </SelectComponents.LoadingMessage>
  );
};

type Props<T> = {
  className?: string;
  disable?: boolean;
  disableDefaultIndicator?: boolean;
  searchable?: boolean;
  loading?: boolean;
  multi?: boolean;
  styles?: StylesConfig<T>;
};

const DropdownSelect = <T extends OptionType>({
  className,
  disable = false,
  disableDefaultIndicator = false,
  searchable,
  loading,
  multi,
  styles,
  components = {},
  ...props
}: Props<T> & SelectProps<T>) => {
  const theme = useAppSelector(getTheme);
  const { dropdownStyle } = useDropdownStyle<T>();

  return (
    <div className="relative flex items-center">
      {!disable && !disableDefaultIndicator && (
        <DropDownIcon
          className="pointer-events-none absolute right-1 top-1/2 z-10 -translate-y-1/2"
          fill={theme.text.primary}
        />
      )}

      <Select
        styles={styles || dropdownStyle}
        isDisabled={disable}
        className={className}
        isMulti={multi}
        isSearchable={searchable}
        isLoading={loading}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => null,
          NoOptionsMessage,
          LoadingMessage,
          ...components,
        }}
        {...props}
      />
    </div>
  );
};

export default DropdownSelect;
