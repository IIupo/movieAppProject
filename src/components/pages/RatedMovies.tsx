import React from 'react';
import { Alert, Spin, Pagination } from 'antd';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { useRatedMovies } from '../fetches/useRatedMovies';
import { useSession } from '../context/SessionContext';
import { useRateMovie } from '../fetches/useRateMovie';
import { OfflineAllert } from '../OfflineAlert';

export const RatedMovies: React.FC = () => {
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
      <OfflineAllert />
      {loading ? 
        <Spin 
        size="large"
        style={{
          position: 'fixed',
          top: '50vh',
          width: '50vw'
        }}
        /> : null}
        <>
          <MovieGrid movies={ratedMovies} onRate={session && handleRate} />
          {(ratedMovies.length > 20) ? (<Pagination
            onChange={handlePageChange}
            total={totalResults}
            pageSize={20}
            showSizeChanger={false}
          />) : null}
          {(!loading && ratedMovies.length === 0) ? (
            <Alert message="Нет оцененных фильмов" type="info" showIcon />
          ) : null}
        </>
    </div>
  );
};
