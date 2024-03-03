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
    buttonHover: string;
  };
  button: {
    color: string;
    hover: string;
    disabled: string;
  };
  input: {
    primary: string;
    secondary: string;
  };
  border: {
    primary: string;
    secondary: string;
  };
};

export type SupportColors = {
  regular: {
    green: string;
    red: string;
    orange: string;
    yellow: string;
    blue: string;
  };
  light: {
    green: string;
    red: string;
    orange: string;
    yellow: string;
    blue: string;
  };
};
