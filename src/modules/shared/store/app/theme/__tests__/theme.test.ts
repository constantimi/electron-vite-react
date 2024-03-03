import { getTheme, setActiveTheme, setCustomTheme } from '../theme';
import { Theme } from '../../../../types/theme';
import { configureAppStore } from '../../../store';

describe('Tests for the theme slice', () => {
  it('should set active theme in the case theme is not custom', async () => {
    const mockStore = configureAppStore();

    // assert initial state
    expect(mockStore.getState().app.themes.name).toBe('Police Dark');

    mockStore.dispatch(setActiveTheme('Police Dark'));

    // assert new theme
    expect(mockStore.getState().app.themes.name).toBe('Police Dark');

    // in the case theme is default
    mockStore.dispatch(setActiveTheme('custom'));
    // assert the name changed
    expect(mockStore.getState().app.themes.name).toBe('custom');

    // assert the same colors that the last select before custom
    expect(mockStore.getState().app.themes).toStrictEqual({
      name: 'custom',
      background: {
        main: '#1C2A5C',
        sidebar: '#273568',
        topbar: '#0B1949',
        activeTab: '#0D1F55',
      },
      text: {
        primary: '#9FA9CA',
        secondary: '#1D2850',
        disabled: '#9FA9CA',
        buttonHover: '#FFFFFF',
      },
      button: {
        color: '#54649F',
        hover: '#283668',
        disabled: '#283668',
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

  it('should set the custom theme', async () => {
    const mockStore = configureAppStore();

    // select the custom
    mockStore.dispatch(setActiveTheme('custom'));

    // Theme for update
    const newTheme = {
      background: {
        main: '#1C2A5C',
        sidebar: '#273568',
        topbar: '#0B1949',
        activeTab: '#0D1F55',
      },
      text: {
        primary: '#9FA9CA',
        secondary: '#1D2850',
        disabled: '#9FA9CA',
        buttonHover: '#FFFFFF',
      },
      button: {
        color: '#54649F',
        hover: '#283668',
        disabled: '#283668',
      },
      input: {
        primary: '#273568',
        secondary: '#9FA9CA',
      },
      border: {
        primary: '#283668',
        secondary: '#0B1948',
      },
    };

    mockStore.dispatch(setCustomTheme(newTheme as Theme));

    expect(mockStore.getState().app.themes.background).toStrictEqual(
      newTheme.background
    );
    expect(mockStore.getState().app.themes.text).toStrictEqual(newTheme.text);
  });

  it('should correctly return theme properties', () => {
    const mockStore = configureAppStore();

    // mock store state
    const expectedTheme = {
      background: mockStore.getState().app.themes.background,
      text: mockStore.getState().app.themes.text,
      button: mockStore.getState().app.themes.button,
      input: mockStore.getState().app.themes.input,
      border: mockStore.getState().app.themes.border,
    };

    const theme = getTheme(mockStore.getState());

    expect(theme).toEqual(expectedTheme);
  });
});
