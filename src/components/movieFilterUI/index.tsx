import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { ListedMovie } from "../../types/interfaces";
import { parseISO, getYear } from "date-fns";

export const titleFilter = function (movie: ListedMovie, value: string) {
  return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = function (movie: ListedMovie, value: string) {
  const genreId = Number(value);
  return genreId > 0 ? movie.genre_ids.includes(genreId) : true;
};

// Reference: https://stackoverflow.com/questions/69265989/format-date-with-date-fns
export const dateFilter = function (movie: ListedMovie, value: string) {
  const releaseYear = getYear(parseISO(movie.release_date));
  const filterYear = getYear(parseISO(value));
  return releaseYear === filterYear;
};

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 5,
    right: 20,
  },
};

interface MovieFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  dateFilter: string;
  sortFilter: string; 
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === "date") {
      setDateFilter(value);
    }
    onFilterValuesChange(filterType, value);
  };

  const handleSortChange = (value: string) => {
    setSortFilter(value);
    onFilterValuesChange("sort", value);
  };

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        Filter
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <FilterCard
          onUserInput={handleFilterChange}
          onSortChange={handleSortChange} 
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          dateFilter={dateFilter}
          sortFilter={sortFilter} 
        />
      </Drawer>
    </>
  );
};

export default MovieFilterUI;