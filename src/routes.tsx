import React, { FunctionComponent, memo } from 'react';
import { Routes } from 'react-router-dom';

import { movieRoutes } from './movie/routes';
import { userRoutes } from './user/routes';

const OurRoutesBase: FunctionComponent = () => (
  <Routes key="routes">
    {userRoutes}
    {movieRoutes}
  </Routes>
);

export const OurRoutes = memo(OurRoutesBase);
