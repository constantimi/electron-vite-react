import { Action, Reducer, combineReducers } from 'redux';
import appReducers from './app/app';
import { RootState } from '.';
import { resetStore } from './actions';
import loginReducer from '../../login/store';

export const combinedReducer = combineReducers({
  app: appReducers,
  login: loginReducer,
});

const rootReducer: Reducer = (state: RootState, action: Action) => {
  let s = state;
  if (action.type === resetStore.type) {
    s = {} as RootState;
  }
  return combinedReducer(s, action);
};

export default rootReducer;
