import React from 'react';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { storeManager } from './modules/shared/store/store';
import { HelmetData } from './modules/shared';
import Router from './Router';

import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <Provider store={storeManager.store}>
    <HelmetProvider>
      <HelmetData />
    </HelmetProvider>

    <Router />
    <ToastContainer position="top-right" />
  </Provider>
);

export default App;
