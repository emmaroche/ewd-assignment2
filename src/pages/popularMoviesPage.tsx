import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { ListedMovie, MovieT } from "../types/interfaces";
import { useQuery } from "react-query";
import { getPopularMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
  dateFilter
} from "../components/movieFilterUI";
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const buttonStyle = (isDisabled: boolean) => ({
  backgroundColor: isDisabled ? "grey" : "rgba(25,118,210,255)",
  color: "white",
  padding: "10px 20px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "1em",
  marginBottom: "30px",
  marginTop: "30px",
});
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
export const sortMovies = (displayedMovies: any[], sortFilter: string) =>  {
  if (sortFilter === "asc") {
    displayedMovies.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
  } else if (sortFilter === "desc") {
    displayedMovies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }
  return displayedMovies;
}

const PopularPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<{ results: MovieT[], hasMore: boolean }, Error>(["popularMovies", page], () => getPopularMovies(page), { keepPreviousData: true });
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

  return (
    <>
      <PageTemplate
        title="Discover Popular Movies"
        movies={displayedMovies}
        action={(movie: ListedMovie) => [
          <AddToFavouritesIcon {...movie} />,
          <AddToMustWatchIcon {...movie} />
        ]}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        dateFilter={filterValues[2].value}
        sortFilter={sortFilter}
      />

      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}>
        <button
          style={buttonStyle(page === 1)}
          onClick={() => setPage((old) => Math.max(old - 1, 0))}
          disabled={page === 1}
        >
          Previous Page
        </button>
        <button
          style={buttonStyle(isLoading || !data?.hasMore)}
          onClick={() => {
            if (!isLoading && data?.hasMore) {
              setPage((old) => old + 1)
            }
          }}
          disabled={isLoading || !data?.hasMore}
        >
          Next Page
        </button>
      </div>
      {isLoading ? <span> Loading...</span> : null}{" "}
    </>
  );
};

export default PopularPage;
