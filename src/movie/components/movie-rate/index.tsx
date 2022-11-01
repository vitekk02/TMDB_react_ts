import { Button } from 'antd';
import React, {
  FunctionComponent, memo, useContext, useEffect, useState,
} from 'react';

import { Loader } from '../../../layout';
import { LoggedInUserContext } from '../../../user/utils/logged-in-user-context';
import { useGetRatedMovies, useToggleRating } from '../../model';

interface Props {
  movieId: number;
}

const BaseRateMovie: FunctionComponent<Props> = (props) => {
  const { movieId } = props;
  const { user } = useContext(LoggedInUserContext);

  const { data, isSuccess } = useGetRatedMovies(user?.id, 1);
  const [rating, setRating] = useState<string>('');
  const [isRated, setIsRated] = useState<boolean>(false);

  const toggleUseRating = useToggleRating(user?.id, movieId, rating);

  useEffect(() => {
    if (isSuccess && data.results) {
      const watchList = data.results.find((item) => item.id === movieId);
      if (watchList) {
        setIsRated(true);
        setRating(watchList.rating.toString());
      } else {
        setIsRated(false);
      }
    }
    // eslint-disable-next-line
  }, [data]);

  const rateMovie = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(e.target.value);
  };

  useEffect(() => {
    if (rating.length > 0) {
      setIsRated(true);
      toggleUseRating.mutate();
    } else {
      setIsRated(false);
    }
    // eslint-disable-next-line
  }, [rating]);

  if (toggleUseRating.isLoading) {
    return (
      <Loader loading />
    );
  }

  if (isSuccess) {
    return (
      <div>
        {isRated === false
          ? (
            <div>
              1
              <input type="radio" name="rating" value="1" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="2" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="3" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="4" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="5" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="6" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="7" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="8" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="9" onChange={(e) => rateMovie(e)} />
              <input type="radio" name="rating" value="10" onChange={(e) => rateMovie(e)} />
              10
            </div>
          )
          : <Button onClick={() => setRating('0')}>Remove Rating</Button>}
      </div>
    );
  }

  return (
    <Loader loading />
  );
};

export const RateMovie = memo(BaseRateMovie);
