import React, { useEffect, useState } from "react";
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
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites"
import { getReviews, getToken } from "../api/custom-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

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

// Reference: https://blog.devgenius.io/react-search-filter-sort-by-and-sort-order-66e4835b0537 
export const sortMovies = (displayedMovies: any[], sortFilter: string) =>  {
  if (sortFilter === "asc") {
    displayedMovies.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
  } else if (sortFilter === "desc") {
    displayedMovies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }
  return displayedMovies;
}

const HomePage: React.FC = () => {
  // Pagination reference: https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries?from=reactQueryV3

  const [page, setPage] = useState(1);
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(["discover", page], () => getMovies(page), { keepPreviousData: true });
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [],
    [titleFiltering, genreFiltering, dateFiltering]
  );
  const [sortFilter, setSortFilter] = useState("");
  const [username] = useState('');
  const [password] = useState('');

  useEffect(() => {
    getReviews('Abigail', '1234')
    .then((reviews) => {
        console.log(reviews);
    });
  }, []);

  useEffect(() => {
    if (username && password) {
      getToken(username, password).then((res: any) => {
        console.log("Response from Auth Backend:", res);
      });
    }
  }, [username, password]);

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
            if (!isLoading && data && data.hasMore) {
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
export default HomePage;