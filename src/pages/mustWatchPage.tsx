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
import RemoveFromMustWatch from "../components/cardIcons/removeFromMustWatch";
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

// Sorts by vote count
function sortMovies(displayedMovies: any[], sortFilter: string) {
  if (sortFilter === "asc") {
    displayedMovies.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
  } else if (sortFilter === "desc") {
    displayedMovies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }
  return displayedMovies;
}

export const genreFiltering = {
  name: "genre",
  value: "0",
  condition: function (movie: MovieT, value: string) {
    const genreId = Number(value);
    const genre_ids = movie.genres.map((g) => g.id);
    return genreId > 0 ? genre_ids.includes(genreId) : true;
  },
};

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatchList: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, dateFiltering]
  );
  const [sortFilter, setSortFilter] = useState("");

  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", movieId],
        queryFn: () => getMovie(movieId.toString()),
      };
    })
  );

  const isLoading = mustWatchMovieQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatch = mustWatchMovieQueries.map((q) => q.data);
  let displayMovies = allMustWatch
    ? filterFunction(allMustWatch)
    : [];

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

  displayMovies = sortMovies(displayMovies, sortFilter);

  return (
    <>
      <PageTemplate
        title="Must Watch Movies"
        movies={displayMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromMustWatch {...movie} />
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

export default MustWatchMoviesPage;