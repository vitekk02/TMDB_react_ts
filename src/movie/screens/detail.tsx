import { Button, Row } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, {
  FunctionComponent, memo, useState,
} from 'react';
import { useParams } from 'react-router-dom';

import { Loader } from '../../layout';
import { ReviewsList } from '../components';
import { MovieRecommendationsList } from '../components/movie-recommendations/recommendationsList';
import { useGetDetail } from '../model';
import './styles.scss';

const BaseMovieDetail: FunctionComponent = () => {
  const params = useParams();

  const {
    data, isSuccess, error, isError,
  } = useGetDetail(params.id ?? '');

  const [recommendations, setRecommendations] = useState(false);
  const [reviews, setReviews] = useState(false);

  const showRecommendations = () => {
    setRecommendations(true);
    setReviews(false);
  };

  const showReviews = () => {
    setRecommendations(false);
    setReviews(true);
  };

  if (isError) {
    return (
      <Content>{error.message}</Content>
    );
  }

  if (isSuccess) {
    return (
      <Content className="container">
        <h1>{data?.title}</h1>
        <img src={`http://image.tmdb.org/t/p/w200/${data?.poster_path}`} alt="" />
        <p>{data?.overview}</p>
        <Row>
          <Button onClick={showRecommendations} className="margin-10">Recommendations</Button>
          <Button onClick={showReviews} className="margin-10">Reviews</Button>
        </Row>
        {recommendations && <MovieRecommendationsList movieId={params.id} />}
        {reviews && <ReviewsList movieId={params.id} /> }
      </Content>
    );
  }

  return (
    <Content>
      <Loader loading withoutChildren />
    </Content>
  );
};

export const MovieDetail = memo(BaseMovieDetail);
