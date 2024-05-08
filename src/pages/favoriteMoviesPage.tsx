import React, { useContext, useState } from "react"
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter, dateFilter
} from "../components/movieFilterUI";
import { MovieT } from "../types/interfaces";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const dateFiltering = {
  name: "release_date",
  value: new Date().toISOString(),
  condition: dateFilter,
};

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    // Is user selected genre in this movies"s genre list? 
    // Always true if selected genre ia All (0).
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

function sortMovies(displayedMovies: any[], sortFilter: string) {
  if (sortFilter === "asc") {
    displayedMovies.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
  } else if (sortFilter === "desc") {
    displayedMovies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }
  return displayedMovies;
}


const FavouriteMoviesPage: React.FC = () => {
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, dateFiltering]
  );
  const [sortFilter, setSortFilter] = useState("");
  
  // Create an array of queries and run them in parallel.
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites = favouriteMovieQueries.map((q) => q.data);
  let displayMovies = allFavourites
    ? filterFunction(allFavourites)
    : [];

  displayMovies = sortMovies(displayMovies, sortFilter);

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

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromFavourites {...movie} />
              <WriteReview {...movie} />
            </>
          );
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

export default FavouriteMoviesPage;