import { combineReducers } from 'redux';
import themeReducer from './theme/theme';
import authReducer from './auth/auth-slice';

const appReducers = combineReducers({
  theme: themeReducer,
  auth: authReducer,
});

export default appReducers;
