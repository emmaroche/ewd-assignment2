import React, { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavIcon from "@mui/icons-material/Favorite";
import { MovieT } from "../../types/interfaces";
import { useNavigate } from "react-router-dom";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
    marginTop: 3,
    marginBottom: 3,
  },
};

const MovieHeader: React.FC<MovieT> = (props) => {
  const [isFavourite, setIsFavourite] = useState(false);
  const navigate = useNavigate();
  const handleClickBack = () => {
    navigate(-1);
  }
  const handleClickForward = () => {
    navigate(1);
  }

  useEffect(() => {
    // Checking if the movie is tagged as a favorite
    const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");
    setIsFavourite(favourites.some((fav: MovieT) => fav.id === props.id));
  }, [props.id]);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={handleClickBack}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {isFavourite && (
        <IconButton aria-label="favorite">
          <FavIcon color="primary" fontSize="large" />
        </IconButton>
      )}

      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h3" sx={{ mb: 1 }}>
          {props.title}
        </Typography>
        <Typography variant="h6" component="h4" sx={{ mb: 2 }}>
          <span>{`${props.tagline}`} </span>
        </Typography>

        <a href={props.homepage}>
          <HomeIcon color="primary" fontSize="large" />
        </a>
      </Box>

      <IconButton aria-label="go forward" onClick={handleClickForward}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
