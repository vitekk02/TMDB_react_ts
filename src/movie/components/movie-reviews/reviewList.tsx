import { Button } from 'antd';
import React, {
  FunctionComponent, memo, useEffect, useState,
} from 'react';

import { ReviewList } from '../../../review';
import { getMovieReviews } from '../../../review/model';
import { ReviewDetail } from './reviewDetail';

interface Props{
  movieId: string | number | undefined;
}

const BaseReviewsList : FunctionComponent<Props> = (props) => {
  const { movieId } = props;

  const [page, setPage] = useState(1);
  const [reviews, setReviews] = useState<ReviewList>();

  useEffect(() => {
    console.log(reviews);
    if (reviews !== undefined) {
      if (page > reviews.total_pages) {
        return;
      }
    }
    getMovieReviews(movieId ?? '', null, page).then((response) => {
      console.log(response);
      if (reviews !== undefined) {
        response.results.splice(0, 1);
        response.results = [...(reviews.results ?? []), ...response.results];
      }
      setReviews(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, page]);

  if (reviews?.total_results === 0) {
    return (
      <div>
        <h3>No reviews</h3>
      </div>
    );
  }

  return (
    <>
      { reviews?.results.map((review) => (
        <ReviewDetail review={review} key={review.id} />
      ))}
      {
        (reviews?.total_pages !== undefined && page < reviews?.total_pages) && (
          <Button type="primary" onClick={() => setPage(page + 1)}>Show more</Button>
        )
      }
    </>
  );
};

export const ReviewsList = memo(BaseReviewsList);
