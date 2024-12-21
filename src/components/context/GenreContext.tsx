import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

interface GenreProviderProps {
  children: ReactNode;
}

const GenreProvider: React.FC<GenreProviderProps> = ({ children }) => {
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