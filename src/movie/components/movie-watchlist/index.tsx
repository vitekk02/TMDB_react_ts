import { Button } from "antd";
import { FunctionComponent, memo } from "react";
import { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
}
const BaseMovieDetailWatchlist: FunctionComponent<Props> = (props) => {
  const { movie } = props;
  return (
    <div>
      <h5>{movie.title}</h5>
      <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
      <Button>Remove from watchlist</Button>
    </div>
  );
};

export const MovieWatchlistDetail = memo(BaseMovieDetailWatchlist);