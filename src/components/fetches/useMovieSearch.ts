import { useState } from 'react';
import { Movie } from '../types/movie';
import { searchMovies } from '../services/api';

 const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const handleSearch = async (query: string, page: number = 1) => {
    if (!query) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    try {
      setLoading(true);
      const data = await searchMovies(query, page);
      setMovies(data.results);
      setTotalResults(data.total_results);
      setCurrentPage(page);
    } catch (err) {
      console.error('Failed to fetch movies.', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (query: string, page: number) => {
    handleSearch(query, page);
  };

  return {
    movies,
    loading,
    totalResults,
    currentPage,
    handleSearch,
    handlePageChange,
  };
};
export {useMovieSearch}