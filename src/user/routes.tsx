import React, { Route } from 'react-router-dom';

import { Login } from './screens/login';

export const userRoutes = [
  (
    <>
      <Route
        key="login"
        path="/login"
        element={<Login />}
      />
      <Route
        key="login"
        path="/"
        element={<Login />}
      />

    </>
  ),
];
