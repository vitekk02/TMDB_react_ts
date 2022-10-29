import {
  useMutation, useQuery, useQueryClient,
} from 'react-query';

import { MOVIE_DETAIL_QUERY, MOVIE_WATCHLIST_QUERY, TOP_RATED_QUERY } from '../../consts';
import { MovieDetail } from '../types/movieDetail';
import { TopRatedMovies } from '../types/topRatedMovies';
import {
  addToWatchlist, getMovieDetail, getMovieWatchlist, getTopRated,
} from './api';

export const useGetTopRated = (language: string | null, page: string | number | null) => useQuery<TopRatedMovies, Error>(
  [TOP_RATED_QUERY, language, page],
  () => getTopRated(language, page),
  {
    notifyOnChangeProps: 'tracked',
    keepPreviousData: true,
  },
);

export const useGetDetail = (id: string) => useQuery<MovieDetail, Error>(
  [MOVIE_DETAIL_QUERY, id],
  () => getMovieDetail(id),
  {
    notifyOnChangeProps: 'tracked',
    keepPreviousData: true,
  },
);

export const useGetWatchList = (accountId: string | number | undefined, page: number) => useQuery<TopRatedMovies, Error>(
  [MOVIE_WATCHLIST_QUERY, accountId, page],
  () => getMovieWatchlist(accountId, page),
);

export const useAddToWatchlist = (accountId: string | number | undefined, sessionId: string | null, movieId: string | number, isWatchList : boolean) => {
  const queryClient = useQueryClient();

  return useMutation(
    () => addToWatchlist(accountId, sessionId, movieId, isWatchList),
    {
      onSuccess: () => queryClient.invalidateQueries(MOVIE_WATCHLIST_QUERY),
    },
  );
};
