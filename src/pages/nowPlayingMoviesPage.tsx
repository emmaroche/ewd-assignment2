import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { ListedMovie, MovieT } from "../types/interfaces";
import { useQuery } from "react-query"; // Import useQuery
import { getNowPlayingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from '../components/cardIcons/addToMustWatch'; 
const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const NowPlayingMoviePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<MovieT[], Error>("nowPlayingMovies", getNowPlayingMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering]
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data : [];
  const displayedMovies = filterFunction(movies);

  return (
    <>
    <PageTemplate
      title='Discover Now Playing Movies'
      movies={displayedMovies}
      action={(movie: ListedMovie) => (
        <AddToMustWatchIcon  {...movie} />
      )}
    />
    <MovieFilterUI
    onFilterValuesChange={changeFilterValues}
    titleFilter={filterValues[0].value}
    genreFilter={filterValues[1].value}
  />
     </>
  );
};

export default NowPlayingMoviePage;