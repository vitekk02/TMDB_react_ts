import { Col, Row } from 'antd';
import React, { FunctionComponent, memo } from 'react';

import { WatchlistButton } from '../../../layout/components/watchlist-button';
import { Movie } from '../../types/movie';

interface Props {
  movie: Movie;
}
const BaseMovieDetailWatchlist: FunctionComponent<Props> = (props) => {
  const { movie } = props;
  return (
    <Row style={{ alignItems: 'center', marginBottom: 20 }} justify="center">
      <Col xl={5}>
        <h5>{movie.title}</h5>
        <img src={`http://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="" />
      </Col>
      <Col xl={3}>
        <WatchlistButton movieId={movie.id} />
      </Col>
    </Row>
  );
};

export const MovieWatchlistDetail = memo(BaseMovieDetailWatchlist);
