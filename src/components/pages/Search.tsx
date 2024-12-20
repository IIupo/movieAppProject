import React, { useState } from 'react';
import { Alert, Spin, Pagination } from 'antd';
import { SearchBar } from '../SearchBar/SearchBar';
import { MovieGrid } from '../MovieGrid/MovieGrid';
import { useMovieSearch } from '../fetches/useMovieSearch';
import { useSession } from '../context/SessionContext';
import { useRateMovie } from '../fetches/useRateMovie';
import { IsOnline } from '../isOnline';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { session } = useSession();
  const { handleRate } = useRateMovie();
  const {
    movies,
    loading,
    totalResults,
    currentPage,
    handleSearch,
  } = useMovieSearch();

  const onSearch = (query: string) => {
    setSearchQuery(query);
    handleSearch(query);
  };

  const handlePageChange = (page: number) => {
    handleSearch(searchQuery, page);
  };

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
            onRate={session ? handleRate : () => {}}
          />
          {!(movies.length === 0) ? 
            (<Pagination
            align="center"
            current={currentPage}
            total={totalResults}
            onChange={handlePageChange}
            pageSize={20}
            showSizeChanger={false}
          />) : null}
          {(!loading && movies.length === 0 && searchQuery) ? (
            <Alert
              message="Результатов нет"
              type="info"
              showIcon
            />
          ) : null}
        </>
      )}
    </>
  );
};
export { Search };