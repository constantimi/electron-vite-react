import { combineReducers } from 'redux';
import otpReducer from './otp/entities/otp-slices';
import loginReducer from './login/entities/login-slices';
import registerReducer from './register/entities/register-slices';

const loginReducers = combineReducers({
  otp: otpReducer,
  login: loginReducer,
  register: registerReducer,
});

export default loginReducers;
