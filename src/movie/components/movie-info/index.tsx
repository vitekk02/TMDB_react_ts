import { Col, Row } from 'antd';
import React, {
  FunctionComponent, memo, useCallback,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { DETAIL_PATH } from '../../../consts';
import { WatchlistButton } from '../../../layout';
import { Movie } from '../../types/movie';
import './style.scss';

interface Props {
  movie: Movie;
}

const MovieInfoBase: FunctionComponent<Props> = (props) => {
  const { movie } = props;
  const navigate = useNavigate();

  const detail = useCallback(() => {
    navigate(DETAIL_PATH(movie.id));
  }, [movie.id, navigate]);

  return (

    <Row gutter={[10, 10]} className="movie" onClick={detail}>
      <Col xl={7}>
        <div className="title">
          {movie.title}
        </div>
        {
        movie.poster_path
        && <img src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`} alt="" />
        }
      </Col>
      <Col xl={13} className="overview">
        <Row>
          {movie.overview}
        </Row>
        <Row>
          <div className="rating">
            Rating:
            {movie.vote_average}
            /10
            <br />
            {movie.adult === true && <>18+</>}
            Release date:
            {movie.release_date}
          </div>
        </Row>
      </Col>
      <Col xl={4} onClick={(e) => e.stopPropagation()}>
        <WatchlistButton movieId={movie.id} />
      </Col>
    </Row>
  );
};
export const MovieInfo = memo(MovieInfoBase);
