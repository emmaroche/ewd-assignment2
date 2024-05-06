import React from "react"; 
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieT} from "../types/interfaces";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import { getSimilarMovies } from '../api/tmdb-api';
import { getMovieActors } from '../api/tmdb-api';

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery<MovieT, Error>(
    ["movie", id],
    ()=> getMovie(id||"")
  );

  const { data: similarMovies } = useQuery(["similarMovies", id], () => getSimilarMovies(id || ""));
  const { data: movieCast } = useQuery(["movieCast", id], () => getMovieActors(id || ""));

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
    return (
    <>
      {movie ? (
        <>
        <PageTemplate movie={movie as MovieT}> 
          <MovieDetails {...movie as MovieT} similarMovies={similarMovies} movieCast={movieCast}/>
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieDetailsPage;