import { Button } from 'antd';
import React, {
  FunctionComponent, memo, useContext, useEffect, useState,
} from 'react';

import { useAddToWatchlist, useGetWatchList } from '../../../movie/model';
import { LoggedInUserContext } from '../../../user/utils/logged-in-user-context';
import { Loader } from '../loader';

interface Props {
  movieId: number;
}

const BaseWatchlistButton: FunctionComponent<Props> = (props) => {
  const { movieId } = props;
  const { user } = useContext(LoggedInUserContext);
  const sessionId = localStorage.getItem('userId');
  const [isWatchList, setIsWatchList] = useState(false);

  const { data, isSuccess } = useGetWatchList(user?.id, 1);
  const addWatchlist = useAddToWatchlist(user?.id, sessionId, movieId, !isWatchList);

  useEffect(() => {
    if (isSuccess && data.results) {
      const watchList = data.results.find((item) => item.id === movieId);
      if (watchList) {
        setIsWatchList(true);
      } else {
        setIsWatchList(false);
      }
    }
  }, [data, isSuccess, movieId]);

  const watchlist = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    addWatchlist.mutate();
  };

  if (addWatchlist.isLoading) {
    return (
      <Loader loading withoutChildren />
    );
  }

  return (
    <Button onClick={(e) => watchlist(e)}>
      {isWatchList === false ? 'Add to watchlist' : 'Remove from watchlist'}
    </Button>
  );
};

export const WatchlistButton = memo(BaseWatchlistButton);
