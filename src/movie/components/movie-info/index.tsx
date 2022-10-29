import { Button, Col, Row } from 'antd';
import React, {
  FunctionComponent, memo, useContext, useEffect, useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { DETAIL_PATH } from '../../../consts';
import { Loader } from '../../../layout';
import { LoggedInUserContext } from '../../../user/utils/logged-in-user-context';
import { useAddToWatchlist, useGetWatchList } from '../../model';
import { Movie } from '../../types/movie';
import './style.scss';

interface Props {
  movie: Movie;
}

const MovieInfoBase: FunctionComponent<Props> = (props) => {
  const { movie } = props;
  const navigate = useNavigate();
  const { user } = useContext(LoggedInUserContext);
  const sessionId = localStorage.getItem('userId');
  const [isWatchList, setIsWatchList] = useState(false);

  const { data, isSuccess } = useGetWatchList(user?.id, 1);
  useEffect(() => {
    if (isSuccess && data.results) {
      const watchList = data.results.find((item) => item.id === movie.id);
      if (watchList) {
        setIsWatchList(true);
      } else {
        setIsWatchList(false);
      }
    }
  }, [data, isSuccess, movie.id]);

  const addWatchlist = useAddToWatchlist(user?.id, sessionId, movie.id, !isWatchList);

  const detail = () => {
    navigate(DETAIL_PATH(movie.id));
  };

  const watchlist = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    addWatchlist.mutate();
  };

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
      <Col xl={4}>
        {!addWatchlist.isLoading
        && (
        <Button onClick={(e) => watchlist(e)}>
          {isWatchList === false ? 'Add to watchlist' : 'Remove from watchlist'}
        </Button>
        )}
        {addWatchlist.isLoading
        && (
          <Loader loading withoutChildren />
        )}
      </Col>
    </Row>
  );
};
export const MovieInfo = memo(MovieInfoBase);
