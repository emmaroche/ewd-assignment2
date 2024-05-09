import React from "react";
import FantasyMovieForm from "../components/fantasyMovieForm";
import Header from "../components/fantasyMovieHeader";

const FantasyMoviePage: React.FC = () => {
  return (
    <>
      <Header title="Create Your Dream Movie" />
      <FantasyMovieForm />
    </>
  );
};

export default FantasyMoviePage;