import config from '../../../../config/config';

export type LocalSettingsOptions = {
  defaultLang: string;
  defaultFontSize: string;
  defaultTheme: string;
};

const { settings } = config;

export default class LocalSettings {
  static get<K extends keyof LocalSettingsOptions>(
    key: K
  ): LocalSettingsOptions[K] {
    return localStorage.getItem(key) || settings[key];
  }

  static set<K extends keyof LocalSettingsOptions>(
    key: K,
    val: LocalSettingsOptions[K]
  ): void {
    localStorage.setItem(key, val);
    settings[key] = val;
  }
}
