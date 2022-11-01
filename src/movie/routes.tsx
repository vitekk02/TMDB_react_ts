import React, { Route } from 'react-router-dom';

import { MovieDetail } from './screens/detail';
import { MovieList } from './screens/list';
import { RatedMovies } from './screens/rated';
import { WatchList } from './screens/watchlist';

export const movieRoutes = [
  (
    <>
      <Route
        key="home"
        path="/home"
        element={<MovieList />}
      />
      <Route
        key="movie"
        path="/movie/:id"
        element={<MovieDetail />}
      />
      <Route
        key="watchlist"
        path="/watchlist"
        element={<WatchList />}
      />
      <Route
        key="rated"
        path="/rated"
        element={<RatedMovies />}
      />
    </>
  ),
];
