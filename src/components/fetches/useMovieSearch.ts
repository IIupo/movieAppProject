import { useState, useCallback, useEffect } from 'react';
import { Movie } from '../../types/movie';
import { searchMovies, getRatedMovies } from '../../services/api';
import { useSession } from '../context/SessionContext';

interface SearchResults {
  results: Movie[];
  total_results: number;
}

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const { session } = useSession();

  const fetchRatedMovies = useCallback(async (): Promise<Movie[]> => {
    if (session?.guest_session_id) {
      try {
        const ratedMovies = await getRatedMovies(session.guest_session_id);
        return ratedMovies.results;
      } catch (error) {
        console.error('Error fetching rated movies:', error);
        return [];
      }
    }
    return [];
  }, [session]);

  const handleSearch = useCallback(async (query?: string, page: number = 1) => {
    const searchTerm = query !== undefined ? query : searchQuery;
    if (!searchTerm) {
      setMovies([]);
      setTotalResults(0);
      return;
    }
  
    try {
      setLoading(true);
      const [searchResults, ratedMovies] = await Promise.all([
        searchMovies(searchTerm, page) as Promise<SearchResults>,
        fetchRatedMovies()
      ]);
  
      const mergedResults = searchResults.results.map((movie: Movie) => {
        const ratedMovie = ratedMovies.find((rm: Movie) => rm.id === movie.id);
        return ratedMovie ? { ...movie, rating: ratedMovie.rating } : movie;
      });
  
      setMovies(mergedResults);
      setTotalResults(searchResults.total_results);
      setCurrentPage(page);
    } catch (err) {
      console.error('Failed to fetch movies:', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, fetchRatedMovies]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery, handleSearch]);

  return {
    movies,
    loading,
    totalResults,
    currentPage,
    searchQuery,
    handleSearch,
    setSearchQuery,
  };
};
