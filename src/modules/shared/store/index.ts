import { combinedReducer } from './reducer';
import { storeManager } from './store';

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof combinedReducer>;

export type AppDispatch = typeof storeManager.store.dispatch;

export type AppGetState = () => RootState;

export const { store } = storeManager;
