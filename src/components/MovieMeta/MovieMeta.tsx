import React from 'react';
import { Rate } from 'antd';
import { Movie } from '../types/movie';
import { format } from 'date-fns';
import styles from './MovieMeta.module.css';
import './rated.css';

interface MovieMetaProps {
  movie: Movie;
  genres: React.ReactNode;
  onRate: (movieId: number, rating: number) => void;
}

function miniOverview(text: string, length = 60): string {
  if (text.length <= length) return text;
  return text.slice(0, text.indexOf(' ', length)) + '...';
}

const MovieMeta: React.FC<MovieMetaProps> = ({ movie, genres, onRate }) => (
  <div className={styles.movie_meta_container}>
    <p>{movie.title}</p>
    <div className={styles.release_date}>
      {movie.release_date ? format(new Date(movie.release_date), 'PPP') : 'Дата не указана'}
    </div>
    <div className={styles.genresContainer}>{genres}</div>
    <p className={styles.overview}>{miniOverview(movie.overview)}</p>
    <div className={styles.rating}>
      <Rate
        className="stars"
        count={10}
        defaultValue={movie.rating}
        onChange={(value) => onRate(movie.id, value)}
      />
    </div>
  </div>
);
export { MovieMeta }