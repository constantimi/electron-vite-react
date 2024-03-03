import { ThemeService } from '../service';

describe('ThemeService', () => {
  it('should correctly check if a theme exists', () => {
    expect(ThemeService.has('Police Dark')).toBeTruthy();
    expect(ThemeService.has('non-existing')).toBeFalsy();
  });

  it('should get all themes', () => {
    expect(ThemeService.getAll()).toEqual(['Dark', 'Police Dark']);
  });

  it('should get a specific theme', () => {
    const defaultTheme = ThemeService.getTheme('Dark');
    expect(defaultTheme).toEqual({
      background: {
        main: '#2F2F2F',
        sidebar: '#3B3B3B',
        topbar: '#000000',
        activeTab: '#242424',
      },
      text: {
        primary: '#6A6A6A',
        secondary: '#292929',
        disabled: '#BDBDBD',
        hover: '#FFFFFF',
      },
      button: {
        color: '#1D1D1D',
        hover: '#252525',
        disabled: '#6A6A6A',
      },
      input: {
        primary: '#3B3B3B',
        secondary: '#6A6A6A',
      },
      border: {
        primary: '#424242',
        secondary: '#1B1B1B',
      },
    });

    const policeDarkTheme = ThemeService.getTheme('Police Dark');
    expect(policeDarkTheme).toEqual({
      background: {
        main: '#1C2A5C',
        sidebar: '#273568',
        topbar: '#0B1949',
        activeTab: '#0D1F55',
      },
      text: {
        primary: '#9FA9CA',
        secondary: '#1D2850',
        disabled: '#58658F',
        hover: '#FFFFFF',
      },
      button: {
        color: '#54649F',
        hover: '#283668',
        disabled: '#9FA9CA',
      },
      input: {
        primary: '#273568',
        secondary: '#9FA9CA',
      },
      border: {
        primary: '#283668',
        secondary: '#0B1948',
      },
    });
  });

  it('should return the default theme if the requested theme does not exist', () => {
    const theme = ThemeService.getTheme('nonExistingTheme');
    expect(theme).toEqual({
      background: {
        main: '#2F2F2F',
        sidebar: '#3B3B3B',
        topbar: '#000000',
        activeTab: '#242424',
      },
      text: {
        primary: '#6A6A6A',
        secondary: '#292929',
        disabled: '#BDBDBD',
        hover: '#FFFFFF',
      },
      button: {
        color: '#1D1D1D',
        hover: '#252525',
        disabled: '#6A6A6A',
      },
      input: {
        primary: '#3B3B3B',
        secondary: '#6A6A6A',
      },
      border: {
        primary: '#424242',
        secondary: '#1B1B1B',
      },
    });
  });
});
