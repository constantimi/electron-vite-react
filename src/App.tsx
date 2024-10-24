import React from 'react';
import { Provider } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { storeManager } from './modules/shared/store/store';
import { NotSupported } from './modules/shared';
import config from './modules/shared/config/config';
import Router from './Router';

import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const { app } = config;

  return (
    <Provider store={storeManager.store}>
      <HelmetProvider>
        <Helmet>
          <title>{app.name}</title>
          <link
            rel="icon"
            type="image/x-icon"
            media="(prefers-color-scheme: light)"
            href={app.icon.light}
          />

          <link
            rel="icon"
            type="image/x-icon"
            media="(prefers-color-scheme: dark)"
            href={app.icon.dark}
          />
        </Helmet>
      </HelmetProvider>
      <div className="hidden sm:block">
        <Router />
      </div>
      <div className="block sm:hidden">
        <NotSupported />
      </div>
      <ToastContainer position="top-right" />
    </Provider>
  );
};

export default App;
