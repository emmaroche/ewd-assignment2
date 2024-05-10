import React, { ChangeEvent } from "react";
import { FilterOption, GenreData } from "../../types/interfaces";
import { SelectChangeEvent } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField, { } from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner"
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

// Reference to help with date filtering: https://mui.com/x/react-date-pickers/getting-started/ & https://mui.com/x/react-date-pickers/date-picker/ & https://mui.com/x/react-date-pickers/base-concepts/

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },

  formControl: {
    margin: 1,
    width: "calc(100% - 8px)",
    backgroundColor: "rgb(255, 255, 255)",
  },
  clearButton: {
    marginTop: 16,
    marginLeft: 8,
    backgroundColor: "rgba(25,118,210,255)",
    color: "white",
  },

};

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  onSortChange: (s: string) => void;
  titleFilter: string;
  genreFilter: string;
  dateFilter: string;
  sortFilter: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = (props) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);
  const dateFilter = props.dateFilter ? new Date(props.dateFilter) : null;

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  const genres = data?.genres || [];
  if (genres[0].name !== "All") {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e: SelectChangeEvent, type: FilterOption, value: string) => {
    e.preventDefault()
    props.onUserInput(type, value)
  };

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleChange(e, "title", e.target.value)
  }

  const handleGenreChange = (e: SelectChangeEvent) => {
    handleChange(e, "genre", e.target.value)
  };

  const handleDateChange = (date: Date | null) => {
    const dateString = date ? date.toISOString().split("T")[0] : "";
    props.onUserInput("date", dateString);
  }

  const handleSortChange = (e: SelectChangeEvent) => {
    handleChange(e, "sort", e.target.value);
  };

  const clearFilters = () => {
    props.onUserInput("title", ""); // Clears title filter
    props.onUserInput("genre", "0"); // Clears genre filter
    props.onUserInput("date", ""); // Clears date filter
  };

  const clearSort = () => {
    props.onSortChange(""); // Clears sort filter
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <>
        <Card sx={styles.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FilterAltIcon color="primary" fontSize="large" />
              Filter the movies
            </Typography>
            <TextField
              sx={styles.formControl}
              id="filled-search"
              label="Search field"
              type="search"
              value={props.titleFilter}
              variant="filled"
              onChange={handleTextChange}
            />
            <DatePicker
              sx={styles.formControl}
              label="Release Year"
              views={["year"]}
              format="yyyy"
              value={dateFilter as any}
              onChange={handleDateChange}
            />
            <FormControl sx={styles.formControl}>
              <InputLabel id="genre-label">Genre</InputLabel>
              <Select
                labelId="genre-label"
                id="genre-select"
                value={props.genreFilter}
                onChange={handleGenreChange}
              >
                {genres.map((genre) => {
                  return (
                    <MenuItem key={genre.id} value={genre.id}>
                      {genre.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <button onClick={clearFilters} style={styles.clearButton}>Clear Filters</button>
          </CardContent>
        </Card>
        <Card sx={styles.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SortIcon color="primary" fontSize="large" />
              Sort the movies
            </Typography>
            <FormControl sx={styles.formControl}>
              <InputLabel id="sort-label">Sort by</InputLabel>
              <Select
                labelId="sort-label"
                id="sort-select"
                value={props.sortFilter}
                onChange={handleSortChange}
              >
                <MenuItem value="asc">Rating (Ascending)</MenuItem>
                <MenuItem value="desc">Rating (Descending)</MenuItem>
              </Select>
            </FormControl>
            <button onClick={clearSort} style={styles.clearButton}>Clear Sort</button>
          </CardContent>
        </Card>
      </>
    </LocalizationProvider>
  );
}

export default FilterMoviesCard;