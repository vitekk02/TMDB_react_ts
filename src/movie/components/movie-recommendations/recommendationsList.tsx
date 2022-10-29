import { Button, Col, Row } from 'antd';
import React, {
  FunctionComponent, memo, useEffect, useState,
} from 'react';

import { getMovieRecommendations } from '../../model';
import { TopRatedMovies } from '../../types/topRatedMovies';
import { MovieDetailMinimal } from './recommendationDetail';

interface Props {
  movieId: number | string | undefined;
}

const BaseMovieRecommendationsList: FunctionComponent<Props> = (props) => {
  const { movieId } = props;

  const [page, setPage] = useState(1);
  const [recommendations, setRecommendations] = useState<TopRatedMovies>();

  useEffect(() => {
    if (recommendations !== undefined) {
      if (page > recommendations.total_pages) {
        return;
      }
    }
    getMovieRecommendations(movieId ?? '', null, page).then((response) => {
      if (recommendations !== undefined) {
        response.results.splice(0, 1);
        response.results = [...(recommendations.results ?? []), ...response.results];
      }
      setRecommendations(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, page]);

  if (recommendations?.total_results === 0) {
    return (
      <div>
        <h3>No recommendations</h3>
      </div>
    );
  }
  return (
    <div>
      <h1>Recommendations</h1>
      <Row>
        {
          recommendations?.results.map((movie) => (
            <Col xs={24} md={12} lg={8} xl={6} key={movie.id}>
              <MovieDetailMinimal movie={movie} />
            </Col>
          ))
        }
      </Row>
      {
        (recommendations?.total_pages !== undefined && page < recommendations?.total_pages) && (
          <Button type="primary" onClick={() => setPage(page + 1)}>Show more</Button>
        )
      }
    </div>
  );
};

export const MovieRecommendationsList = memo(BaseMovieRecommendationsList);
