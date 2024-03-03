/* eslint-disable import/first */
const localSettingsGet = jest.fn();

// mock the LocalSettings module
jest.mock('../../store/app/settings/local/local', () => ({
  get: localSettingsGet,
}));

import i18n from 'i18next';
import { setLanguage } from '../../lang/lang';

// mock the i18next module
jest.mock('i18next', () => ({
  use: jest.fn().mockReturnThis(),
  init: jest.fn(),
  changeLanguage: jest.fn(),
}));

// mock the i18next-http-backend module
jest.mock('i18next-http-backend', () => jest.fn());

describe('translation', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let consoleErrorSpy: any;
  beforeAll(() => {
    // Create a spy on console.error before running the tests
    consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => 'language not supported');
  });

  afterAll(() => {
    // Clean up the spy after running the tests
    consoleErrorSpy.mockRestore();
  });

  it('should change language', () => {
    localSettingsGet.mockReturnValue('nl');
    setLanguage('en');

    expect(i18n.changeLanguage).toHaveBeenCalledWith('en');
  });
});
