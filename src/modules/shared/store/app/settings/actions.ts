import { createAction } from '@reduxjs/toolkit';

export const touchscreenEvent = createAction<boolean>('settings/touchscreen');
