import { useCallback } from 'react';
import { rateMovie } from '../services/api';
import { useSession } from '../context/SessionContext';

const useRateMovie = () => {
  const { session } = useSession();

  const handleRate = useCallback(async (movieId: number, rating: number) => {
    if (!session) return;

    try {
      await rateMovie(movieId, rating, session.guest_session_id);
    } catch (err) {
      console.error('Failed to rate movie:', err);
    }
  }, [session]);

  return { handleRate };
};
export {useRateMovie}