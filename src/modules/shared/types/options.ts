export type OptionType = {
  value: unknown;
  label: unknown;
};

export type DropdownOption<T = string> = {
  label: string;
  value: T;
};
