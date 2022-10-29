import axios from 'axios';

import { apiKey } from '../../consts';
import { MovieDetail } from '../types/movieDetail';
import { TopRatedMovies } from '../types/topRatedMovies';

const TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated${apiKey}`;
const MOVIE_DETAIL = (id:string) => `https://api.themoviedb.org/3/movie/${id}${apiKey}`;
const MOVIE_RECOMMENDATIONS = (id: string | number) => `https://api.themoviedb.org/3/movie/${id}/recommendations${apiKey}`;
const WATCHLIST = (accountId: string | number, sessionId: string) => `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies${apiKey}&session_id=${sessionId}`;
const ADD_TO_WATCHLIST = (accountId: string | number, sessionId: string) => `https://api.themoviedb.org/3/account/${accountId}/watchlist${apiKey}&session_id=${sessionId}`;

export const getTopRated = async (language: string | null, page: string | number | null): Promise<TopRatedMovies> => {
  let query = TOP_RATED;
  if (page !== null) {
    query += `&page=${page}`;
  }
  if (language !== null) {
    query += `&lanuage=${language}`;
  }

  const response = await axios.get(query);

  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Couldnt get movies');
};

export const getMovieDetail = async (id: string): Promise<MovieDetail> => {
  const response = await axios.get(MOVIE_DETAIL(id));
  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Failed to load movie');
};

export const getMovieRecommendations = async (id: string | number, language : string | null, page : number| null): Promise<TopRatedMovies> => {
  let query = MOVIE_RECOMMENDATIONS(id);
  if (page !== null) {
    query += `&page=${page}`;
  }
  if (language !== null) {
    query += `&lanuage=${language}`;
  }

  const response = await axios.get(query);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Failed to load movie');
};

export const getMovieWatchlist = async (accountId: string | number | undefined, page: number): Promise<TopRatedMovies> => {
  const sessionId = localStorage.getItem('userId');
  if (sessionId === null) {
    throw new Error('No session id');
  }

  if (accountId === undefined) {
    throw new Error('No account id');
  }
  let query = WATCHLIST(accountId, sessionId);

  if (page !== null) {
    query += `&page=${page}`;
  }
  const response = await axios.get(query);
  if (response.status === 200) {
    return response.data;
  }
  throw new Error('Failed to load movie');
};

export const addToWatchlist = async (accountId: string | number | undefined, sessionId: string | null, movieId: string | number, isWatchList: boolean): Promise<boolean> => {
  if (accountId === undefined || sessionId === null) {
    throw new Error('No session id');
  }
  const response = await axios.post(ADD_TO_WATCHLIST(accountId, sessionId), {
    media_type: 'movie',
    media_id: movieId,
    watchlist: isWatchList,
  });
  if (response.data.success) {
    return true;
  }
  throw new Error('Failed to add to watchlist');
};
