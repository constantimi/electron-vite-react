import { configureStore } from '@reduxjs/toolkit';
import reducer from './reducer';
import { touchscreenMiddleware } from './app/settings/mid/touchscreen';

/**
 * Function that uses the redux-toolkit to create a store in a more simple way, and also contais the redux-dev-toolkit so
 * don't needed to be imported as well.
 * inside the function configureStore takes the reducer and middleware as parameters to create a store for the app.
 * @returns A Store for the application
 */
export const configureAppStore = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(touchscreenMiddleware()),
  });

// managing a store instance to allow for resetting
class StoreManager {
  private storeInstance: AppStore;

  constructor() {
    this.storeInstance = configureAppStore();
  }

  get store(): AppStore {
    return this.storeInstance;
  }

  resetStore(): void {
    this.storeInstance = configureAppStore();
  }
}

export const storeManager = new StoreManager();

// =========================================================
// types

export type AppStore = ReturnType<typeof configureAppStore>;
