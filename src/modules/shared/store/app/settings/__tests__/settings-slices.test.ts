import { configureAppStore } from '../../../store';
import { setLanguage } from '../settings-slices';

describe('Test for the settings slice', () => {
  it('store should get the default language', async () => {
    const mockStore = configureAppStore();

    expect(mockStore.getState().app.settings.defaultLang.init).toBe('nl');
  });

  it('should change the default language when called', async () => {
    const mockStore = configureAppStore();

    mockStore.dispatch(setLanguage('en'));

    expect(mockStore.getState().app.settings.defaultLang.value).toBe('en');
  });
});
