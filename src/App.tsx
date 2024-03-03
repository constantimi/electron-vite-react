import React from 'react';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import { storeManager } from './modules/shared/store/store';
import 'react-toastify/dist/ReactToastify.css';
import config from './modules/shared/config/config';
import Router from './Router';
import NotSupported from './modules/shared/components/error/NotSupported';

const App = () => {
  const { appName, appIcon } = config;

  return (
    <Provider store={storeManager.store}>
      <Helmet>
        <title>{appName}</title>
        <link rel="icon" type="image/svg+xml" href={appIcon} />
      </Helmet>
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
