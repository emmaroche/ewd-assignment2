export interface BaseMovie {
  title: string;
  budget: number;
  homepage: string | undefined;
  id: number;
  imdb_id: string;
  original_language: string;
  overview: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  poster_path?: string;
  tagline: string;
  runtime: number;
  revenue: number;
  vote_count: number;
  favourite?: boolean;
}

export interface BaseMovieList {
  movies: BaseMovie[];
}

interface Actor {
  cast_id: number;
  character: string;
  name: string;
  profile_path: string;
}

interface Cast {
  cast: Actor[];
}

interface SimilarMovieData {
  poster_path?: string;
  title: string;
  overview: string;
}

interface SimilarMoviesResult {
  results: SimilarMovieData[];
}

export interface MovieT extends BaseMovie {
  genres: {
    id: number;
    name: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  production_companies: {
    name: string;
  }[];
  similarMovies?: SimilarMoviesResult;
  movieCast?: Cast; 
}

export interface MovieImage {
  file_path: string;
  aspect_ratio?: number; 
  height?: number;
  iso_639_1?: string;
  vote_average?: number;
  vote_count?: number;
  width?: number;
}

export interface ListedMovie extends BaseMovie {
  genre_ids: number[];
}

export type FilterOption = "title" | "genre";

export interface MovieListPageTemplateProps {
  movies: ListedMovie[];
  title: string;
  action: (m: ListedMovie) => ReactNode;
}

export interface Review{
  id: string;
  content: string
  author: string
}

export interface GenreData {
  genres: {
    id: string;
    name: string
  }[];
}

export interface Review {
  author: string,
  content: string,
  agree: boolean,
  rating: number,
  movieId: number,
}

interface DiscoverMovies {
  page: number;	
  total_pages: number;
  total_results: number;
  results: BaseMovie[];
}
