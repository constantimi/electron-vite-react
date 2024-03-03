import { combineReducers } from 'redux';
import themeReducer from './theme/theme';
import authReducer from './auth/auth-slice';
import teamReducer from './team/team-slice';
import settingsReducer from './settings/settings-slices';
import userSettingsReducer from './user/user-slice';

const appReducers = combineReducers({
  settings: settingsReducer,
  userSettings: userSettingsReducer,
  themes: themeReducer,
  auth: authReducer,
  team: teamReducer,
});

export default appReducers;
