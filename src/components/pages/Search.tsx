import React, { useCallback } from 'react';
import { Alert, Spin, Pagination } from 'antd';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid }from '../MovieGrid/MovieGrid';
import { useMovieSearch } from '../fetches/useMovieSearch';
import { useSession } from '../context/SessionContext';
import { useRateMovie } from '../fetches/useRateMovie';
import { IsOnline } from '../isOnline';

const Search: React.FC = () => {
  const { session } = useSession();
  const { handleRate } = useRateMovie();
  const {
    movies,
    loading,
    totalResults,
    currentPage,
    handleSearch,
    setSearchQuery,
  } = useMovieSearch();

  const onSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, [setSearchQuery]);

  const handlePageChange = useCallback((page: number) => {
    handleSearch(undefined, page);
  }, [handleSearch]);

  const onRateMovie = useCallback(async (movieId: number, rating: number) => {
    if (session) {
      await handleRate(movieId, rating);
      handleSearch();
    }
  }, [session, handleRate, handleSearch]);

  return (
    <>
      <SearchBar onSearch={onSearch} />
      <IsOnline />
      {loading ? (
        <Spin />
      ) : (
        <>
          <MovieGrid
            movies={movies}
            onRate={onRateMovie}
          />
          {movies.length > 0 ? (
            <Pagination
              current={currentPage}
              total={totalResults}
              onChange={handlePageChange}
              pageSize={20}
              showSizeChanger={false}
            />
          ): null}
          {(!loading && movies.length === 0) ? (
            <Alert
              message="Результатов нет"
              type="info"
              showIcon
            />
          ): null}
        </>
      )}
    </>
  );
};

export { Search };