import { Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch } from '../../..';
import { setTouchScreen } from '../settings-slices';
import { touchscreenEvent } from '../actions';

export const touchscreenMiddleware = (): Middleware => {
  let init = false;

  return ({ dispatch }: { dispatch: AppDispatch }) =>
    (next: AppDispatch) =>
    async (action: PayloadAction<boolean>) => {
      if (!init) {
        window.addEventListener(
          'touchend',
          () => dispatch(setTouchScreen(true)),
          false
        );

        init = true;
      }

      if (touchscreenEvent.match(action)) {
        const data = action.payload;
        dispatch(setTouchScreen(data));
      }

      next(action);
    };
};
