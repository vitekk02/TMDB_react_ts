import React, { FunctionComponent, memo } from 'react';

import { Movie } from '../../types/movie';

interface Props {
  movie: Movie;
}
const BaseMovieDetailMinimal: FunctionComponent<Props> = (props) => {
  const { movie } = props;
  return (
    <div>
      <h5>{movie.title}</h5>
      <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
    </div>
  );
};

export const MovieDetailMinimal = memo(BaseMovieDetailMinimal);
