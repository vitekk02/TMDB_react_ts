import axios from 'axios';

import { apiKey } from '../../consts';
import { ReviewList } from '../types/reviewList';

const MOVIE_REVIEWS = (id: string | number) => `https://api.themoviedb.org/3/movie/${id}/reviews${apiKey}`;

export const getMovieReviews = async (id: string | number, language: string | null, page: number | null): Promise<ReviewList> => {
  let query = MOVIE_REVIEWS(id);
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
  throw new Error('Failed to load reviews');
};
