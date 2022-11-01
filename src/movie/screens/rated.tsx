import React, {
  FunctionComponent, memo, useContext,
} from 'react';

import { Loader } from '../../layout';
import { LoggedInUserContext } from '../../user/utils/logged-in-user-context';
import { useGetRatedMovies } from '../model';

const BaseRatedMovies: FunctionComponent = () => {
  const { user } = useContext(LoggedInUserContext);

  const {
    data, error, isError, isSuccess,
  } = useGetRatedMovies(user?.id ?? '', 1);

  if (isError) {
    return (
      <div>{error.message}</div>
    );
  }

  if (isSuccess && data.total_results === 0) {
    return (
      <div className="center"><h1>Rated movies is empty</h1></div>
    );
  }

  if (isSuccess && data.total_results > 0) {
    return (
      <div>
        {data.results.map((movie) => (
          <div key={movie.id}>
            <h1>{movie.title}</h1>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Loader loading />
  );
};

export const RatedMovies = memo(BaseRatedMovies);
