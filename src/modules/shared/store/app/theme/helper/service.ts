import config from '../../../../config/config';
import { ThemeObject } from '../../../../types/theme';

export class ThemeService {
  static has(name: string): boolean {
    return Object.keys(config.themes).includes(name);
  }

  static getAll(): string[] {
    return Object.keys(config.themes);
  }

  static validateDefaultTheme(): void {
    const { defaultTheme } = config.settings;

    if (!ThemeService.has(defaultTheme)) {
      throw new Error(`Default theme "${defaultTheme}" is not a valid theme`);
    }
  }

  static getTheme(name: string): ThemeObject {
    ThemeService.validateDefaultTheme();

    const theme = ThemeService.has(name) ? name : config.settings.defaultTheme;

    const themeConfig = config.themes[theme];

    if (!themeConfig) {
      throw new Error(`Theme configuration not found for theme: ${theme}`);
    }

    return themeConfig as ThemeObject;
  }
}
