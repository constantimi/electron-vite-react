import React, { Suspense } from 'react';
import { HashRouter, Routes } from 'react-router-dom';
import { Loading } from './modules/shared';

// const Dashboard = lazy(() =>
//   import('./modules/dashboard').then((module) => ({
//     default: module.Dashboard,
//   }))
// );

const Router = () => (
  <HashRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  </HashRouter>
);

export default Router;
