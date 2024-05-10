import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetails from "../components/movieDetails";
import { MovieT } from "../types/interfaces";
import PageTemplate from "../components/templateMoviePage";
import { getMovie } from "../api/tmdb-api"
import { useQuery } from "react-query";
import Spinner from "../components/spinner"
import { getSimilarMovies } from "../api/tmdb-api";
import { getMovieCast } from "../api/tmdb-api";

const buttonStyle = {
  backgroundColor: "rgba(25,118,210,255)",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1em",
  marginBottom: "30px",
  marginTop: "30px",
  marginRight: "30px",
};

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const [castPage, setCastPage] = useState(1);
  const [similarMoviesPage, setSimilarMoviesPage] = useState(1);
  const itemsPerPage = 8;

  const { data: movie, error, isLoading, isError } = useQuery<MovieT, Error>(
    ["movie", id],
    () => getMovie(id || "")
  );

  const { data: similarMovies } = useQuery(["similarMovies", id], () => getSimilarMovies(id || ""));
  const { data: movieCast } = useQuery(["movieCast", id], () => getMovieCast(id || ""));

  // Reference: https://stackoverflow.com/questions/42761068/paginate-javascript-array

  const paginatedCast = movieCast?.cast ? movieCast.cast.slice((castPage - 1) * itemsPerPage, castPage * itemsPerPage) : [];
  const paginatedSimilarMovies = similarMovies?.results ? similarMovies.results.slice((similarMoviesPage - 1) * itemsPerPage, similarMoviesPage * itemsPerPage) : [];

  const noMoreCastMembers = movieCast?.cast && castPage * itemsPerPage >= movieCast.cast.length;
  const noMoreSimilarMovies = similarMovies?.results && similarMoviesPage * itemsPerPage >= similarMovies.results.length;

  const atFirstCastPage = castPage === 1;
  const atFirstSimilarMoviesPage = similarMoviesPage === 1;

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
          <PageTemplate movie={movie as MovieT} >
            <MovieDetails {...movie as MovieT} similarMovies={{ results: paginatedSimilarMovies }} movieCast={{ cast: paginatedCast }}
              castChildren={
                <>
                  <button style={{ ...buttonStyle, backgroundColor: atFirstCastPage ? "grey" : "rgba(25,118,210,255)", cursor: atFirstCastPage ? "not-allowed" : "pointer" }} onClick={() => setCastPage(old => Math.max(old - 1, 1))} disabled={atFirstCastPage}>Previous Cast Members</button>
                  <button style={{ ...buttonStyle, backgroundColor: noMoreCastMembers ? "grey" : "rgba(25,118,210,255)", cursor: noMoreCastMembers ? "not-allowed" : "pointer" }} onClick={() => setCastPage(old => old + 1)} disabled={noMoreCastMembers}>More Cast Members</button>
                </>
              }
              similarMoviesChildren={
                <>
                  <button style={{ ...buttonStyle, backgroundColor: atFirstSimilarMoviesPage ? "grey" : "rgba(25,118,210,255)", cursor: atFirstSimilarMoviesPage ? "not-allowed" : "pointer" }} onClick={() => setSimilarMoviesPage(old => Math.max(old - 1, 1))} disabled={atFirstSimilarMoviesPage}>Previous Similar Movies</button>
                  <button style={{ ...buttonStyle, backgroundColor: noMoreSimilarMovies ? "grey" : "rgba(25,118,210,255)", cursor: noMoreSimilarMovies ? "not-allowed" : "pointer" }} onClick={() => setSimilarMoviesPage(old => old + 1)} disabled={noMoreSimilarMovies}>More Similar Movies</button>
                </>
              }
            />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MovieDetailsPage;