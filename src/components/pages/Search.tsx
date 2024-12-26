import React, { useCallback } from 'react';
import { Alert, Spin, Pagination } from 'antd';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid }from '../MovieGrid/MovieGrid';
import { useMovieSearch } from '../fetches/useMovieSearch';
import { useSession } from '../context/SessionContext';
import { useRateMovie } from '../fetches/useRateMovie';
import { OfflineAllert } from '../OfflineAlert';

export const Search: React.FC = () => {
  const { session } = useSession();
  const { handleRate } = useRateMovie();
  const {
    movies,
    loading,
    totalResults,
    currentPage,
    handleSearch,
    searchQuery,
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
      <OfflineAllert />
      {loading ? 
        <Spin 
        size="large"
        style={{
          position: 'fixed',
          top: '50vh',
          width: '50vw'
        }}
        />
       : null}
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
          {(!loading && movies.length === 0 && searchQuery) ? (
            <Alert
              message="Результатов нет"
              type="info"
              showIcon
            />
          ): null}
        </>
    </>
  );
};

