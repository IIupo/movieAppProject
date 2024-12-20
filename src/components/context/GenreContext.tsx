import React, { createContext, useContext, useState, useEffect } from 'react';
import { Genre } from '../types/movie';
import { fetchGenres } from '../services/api';

interface GenreContextType {
  genres: Genre[];
  isLoading: boolean;
}

const GenreContext = createContext<GenreContextType>({
  genres: [],
  isLoading: false,
});

const useGenres = () => useContext(GenreContext);

const GenreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadGenres();
  }, []);

  return (
    <GenreContext.Provider value={{ genres, isLoading }}>
      {children}
    </GenreContext.Provider>
  );
};
export {GenreProvider, useGenres}