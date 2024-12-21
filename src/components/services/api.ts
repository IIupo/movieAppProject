const BASE_URL = 'https://api.themoviedb.org/3';
const API_OPTIONS = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTdiYzNjOWQ3ZjI4YmEyYzE3YWNlNDY3YTZiMmJjOSIsIm5iZiI6MTczMzc1NzE0Ny41MTgwMDAxLCJzdWIiOiI2NzU3MDhkYmExOGNiODY5NWFmZDkwYmYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.eK7C7F2k399BshOp0b3eLgp4AgjX1ZSStSbhslWYyDI'
  }
};
export const createGuestSession = async () => {
  const response = await fetch(
    `${BASE_URL}/authentication/guest_session/new`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error('Failed to create guest session');
  return response.json();
};

export const searchMovies = async (query: string, page: number) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=${page}`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error('Failed to fetch movies');
  return response.json();
};

export const fetchGenres = async () => {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?language=en`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error('Failed to fetch genres');
  return response.json();
};

export const rateMovie = async (movieId: number, rating: number, guestSessionId: string) => {
  const options = {
    ...API_OPTIONS,
    method: rating === 0 ? 'DELETE' : 'POST',
    headers: {
      ...API_OPTIONS.headers,
      'Content-Type': 'application/json',
    },
    body: rating !== 0 ? JSON.stringify({ value: rating }) : undefined,
  };

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/rating?guest_session_id=${guestSessionId}`,
    options
  );
  if (!response.ok) throw new Error('Failed to rate movie');
  return response.json();
};

export const getRatedMovies = async (guestSessionId: string, page: number = 1) => {
  const response = await fetch(
    `${BASE_URL}/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
    API_OPTIONS
  );
  if (!response.ok) throw new Error('Failed to fetch rated movies');
  return response.json();
};
