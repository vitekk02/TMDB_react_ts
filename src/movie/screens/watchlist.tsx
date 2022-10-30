import React, {
  FunctionComponent, memo, useContext,
} from 'react';

import { Loader } from '../../layout';
import { LoggedInUserContext } from '../../user/utils/logged-in-user-context';
import { MovieWatchlistDetail } from '../components/movie-watchlist';
import { useGetWatchList } from '../model';

import './styles.scss';

const BaseWatchList: FunctionComponent = () => {
  const { user } = useContext(LoggedInUserContext);

  const {
    data, isError, isSuccess, error,
  } = useGetWatchList(user?.id ?? '', 1);

  if (isError) {
    return (
      <div>{error.message}</div>
    );
  }

  if (isSuccess && data.total_results === 0) {
    return (
      <div className="center"><h1>Watchlist is empty</h1></div>
    );
  }

  if (isSuccess) {
    return (
      <div>
        {isSuccess && data.results && data.results.map((movie) => (
          <MovieWatchlistDetail movie={movie} key={movie.id} />
        ))}
      </div>
    );
  }

  return (
    <Loader message="Loading..." />
  );
};

export const WatchList = memo(BaseWatchList);
