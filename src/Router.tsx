import React, { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Loading } from './modules/shared';

// const Dashboard = lazy(() =>
//   import('./modules/dashboard').then((module) => ({
//     default: module.Dashboard,
//   }))
// );

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;
