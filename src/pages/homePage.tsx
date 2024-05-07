import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  dateFilter
} from "../components/movieFilterUI";
import { DiscoverMovies, ListedMovie } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'

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
const dateFiltering = {
  name: "release_date",
  value: new Date().toISOString(),
  condition: dateFilter,
};

  // Sorts by vote count
  // Reference: https://blog.devgenius.io/react-search-filter-sort-by-and-sort-order-66e4835b0537 
  function sortMovies(displayedMovies: any[], sortFilter: string) {
    if (sortFilter === "asc") {
      displayedMovies.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
    } else if (sortFilter === "desc") {
      displayedMovies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
    }
    return displayedMovies;
  }
  
const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, dateFiltering] 
  );
  const [sortFilter, setSortFilter] = useState("");

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    if (type === "sort") {
      setSortFilter(value);
      return;
    }

    const changedFilter = { name: type, value: value };
    let updatedFilterSet = [];
  
    if (value === "") {
      // If the value is cleared, reset all filters
      updatedFilterSet = [{ name: "title", value: "" }, { name: "genre", value: "0" }, { name: "release_date", value: new Date().toISOString() }];
    } else {
      updatedFilterSet =
        type === "title"
          ? [changedFilter, filterValues[1], filterValues[2]]
          : type === "genre"
          ? [filterValues[0], changedFilter, filterValues[2]]
          : [filterValues[0], filterValues[1], changedFilter];
    }
  
    setFilterValues(updatedFilterSet);
  };
  
  const movies = data ? data.results : [];
  let displayedMovies = filterFunction(movies);

  // Call the sorting function and update displayedMovies
  displayedMovies = sortMovies(displayedMovies, sortFilter);

  // Redundant, but necessary to avoid app crashing.
  const favourites = movies.filter(m => m.favourite)
  localStorage.setItem("favourites", JSON.stringify(favourites));

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        dateFilter={filterValues[2].value}
        sortFilter={sortFilter} 
      />
    </>
  );
};
export default HomePage;