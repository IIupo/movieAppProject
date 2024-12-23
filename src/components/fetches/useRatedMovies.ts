import { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { getRatedMovies } from '../services/api';
import { useSession } from '../context/SessionContext';

const useRatedMovies = () => {
  const { session } = useSession();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const loadRatedMovies = async (page: number) => {
    if (!session) return;

    try {
      setLoading(true);
      const data = await getRatedMovies(session.guest_session_id, page);
      setMovies(data.results);
      setTotalResults(data.total_results);
      setCurrentPage(page);
    } catch (err) {
      console.error('Failed to load rated movies', err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      loadRatedMovies(1);
    }
  }, [session]);

  const handlePageChange = (page: number) => {
    loadRatedMovies(page);
  };

  return {
    movies,
    loading,
    totalResults,
    currentPage,
    handlePageChange,
  };
};
export { useRatedMovies }