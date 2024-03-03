import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch } from '../..';
import { loadUserInfo } from '../user/user-thunk';
import { loadUserSettings } from './settings-thunk';
import LocalSettings from './local/local';
import { setActiveTheme } from '../theme';

export const loadSettingsData = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>('loadSettingsData', async (userId, { dispatch }) => {
  if (userId) {
    await Promise.all([
      dispatch(loadUserInfo({ urlArgs: userId })),
      dispatch(loadUserSettings({ urlArgs: userId })),
    ]);

    const theme = LocalSettings.get('defaultTheme');
    dispatch(setActiveTheme(theme));
  }
});
