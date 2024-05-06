import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateMoviePage";
import MovieReview from "../components/movieReview";
import { MovieT, Review } from "../types/interfaces"; 

const MovieReviewPage: React.FC = () => {
  const { state } = useLocation();
  const { movie, review } = state as { movie: MovieT, review: Review }; 
  return (
    <PageTemplate movie={movie}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default MovieReviewPage;
