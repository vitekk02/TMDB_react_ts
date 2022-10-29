import { Content } from 'antd/lib/layout/layout';
import React, {
  FunctionComponent, memo, useState,
} from 'react';

import { Loader } from '../../layout';
import { Pagination } from '../../layout/components/pagination';
import { MovieInfo } from '../components/movie-info';
import { useGetTopRated } from '../model';

const BaseMovieList: FunctionComponent = () => {
  const [page, setPage] = useState(1);

  const handlePages = (updatePage: number) => {
    setPage(updatePage);
  };

  const {
    data, isError, isSuccess, error,
  } = useGetTopRated('en-US', page);

  if (isError) {
    return (
      <Content>{error.message}</Content>
    );
  }

  if (isSuccess) {
    return (
      <Content className="container">
        {data.results && data.results.map((movie) => (
          <MovieInfo movie={movie} />
        ))}
        <Pagination
          page={data.page}
          totalPages={500}
          handlePagination={handlePages}
        />
      </Content>
    );
  }

  return (
    <Content>
      <Loader loading withoutChildren />
    </Content>
  );
};

export const MovieList = memo(BaseMovieList);
