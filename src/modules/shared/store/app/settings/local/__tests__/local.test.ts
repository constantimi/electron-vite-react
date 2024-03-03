import config from '../../../../../config/config';
import LocalSettings from '../local';

describe('LocalSettings', () => {
  it('should get a setting from localStorage if it exists', () => {
    LocalSettings.set('defaultLang', 'nl');
    expect(LocalSettings.get('defaultLang')).toEqual('nl');
  });

  it('should get a setting from the config if it does not exist in localStorage', () => {
    const { defaultLang } = config.settings;
    LocalSettings.set('defaultLang', defaultLang);
    expect(LocalSettings.get('defaultLang')).toEqual(defaultLang);
  });
});
