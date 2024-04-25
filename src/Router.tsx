import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Loading from './modules/shared/components/loading/Loading';

const Login = lazy(() =>
  import('./modules/login').then((module) => ({
    default: module.Login,
  }))
);
const Otp = lazy(() =>
  import('./modules/login').then((module) => ({
    default: module.Otp,
  }))
);
const Register = lazy(() =>
  import('./modules/login').then((module) => ({
    default: module.Register,
  }))
);

const Router = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Otp />} />

        {/* signup */}
        <Route path="/login/signup" element={<Register />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default Router;
