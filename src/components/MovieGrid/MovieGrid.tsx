import React from 'react';
import { MovieCard } from '../MovieCard/MovieCard';
import { Movie } from '../types/movie';
import styles from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onRate: (movieId: number, rating: number) => void;
}

 const MovieGrid: React.FC<MovieGridProps> = ({ movies, onRate }) => (
  <div className={styles.movie_grid}>
    {movies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        onRate={onRate}
      />
    ))}
  </div>
);
export { MovieGrid };