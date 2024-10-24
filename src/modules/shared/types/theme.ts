export enum Mode {
  DARK = 'dark',
  LIGHT = 'light',
}

export type Theme = {
  background: {
    main: string;
    sidebar: string;
    topbar: string;
    activeTab: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
    button: string;
  };
  button: {
    color: string;
    hover: string;
    disabled: string;
  };
  input: {
    primary: string;
    default: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
};

export type SupportColors = {
  green: string;
  red: string;
  orange: string;
  yellow: string;
  blue: string;
};
