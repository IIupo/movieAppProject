import React from 'react';
import { Alert, Spin, Pagination } from 'antd';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { useRatedMovies } from '../fetches/useRatedMovies';
import { useSession } from '../context/SessionContext';
import { useRateMovie } from '../fetches/useRateMovie';
import { IsOnline } from '../isOnline';

const RatedMovies: React.FC = () => {
  const { session } = useSession();
  const { handleRate } = useRateMovie();
  const {
    movies: ratedMovies,
    loading,
    totalResults,
    handlePageChange,
  } = useRatedMovies();

  if (!session) {
    return (
      <Alert message="Нет активной сессии" type="info" showIcon />
    );
  }

  return (
    <div>
      <IsOnline />
      {loading ? (
        <Spin />
      ) : (
        <>
          <MovieGrid movies={ratedMovies} onRate={session && handleRate} />
          <Pagination
            onChange={handlePageChange}
            total={totalResults}
            pageSize={20}
            showSizeChanger={false}
          />
          {(!loading && ratedMovies.length === 0) ? (
            <Alert message="Нет оцененных фильмов" type="info" showIcon />
          ) : null}
        </>
      )}
    </div>
  );
};
export { RatedMovies }