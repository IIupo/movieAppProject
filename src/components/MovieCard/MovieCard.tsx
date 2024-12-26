import React from 'react';
import { useGenres } from '../context/GenreContext';
import { Movie } from '../../types/movie';
import { RatingBadge } from '../RatingBadge/RatingBadge';
import { MovieMeta } from '../MovieMeta/MovieMeta';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
  onRate: (movieId: number, rating: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onRate }) => {
  const { genres } = useGenres();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKT7sF31aX85u52cMeMmKCOKUMmIQnvw_huQ&s';

  const movieGenres = genres
    .filter((genre) => movie.genre_ids.includes(genre.id))
    .map((genre) => (
      <div key={genre.id} className={styles.tag}>
        {genre.name}
      </div>
    ));

  return (
    <div className={styles.movie_container}>
      <img src={posterUrl} className={styles.img} alt={movie.title} />
      <MovieMeta movie={movie} genres={movieGenres} onRate={onRate} />
      <RatingBadge rating={movie.vote_average} />
    </div>
  );
};