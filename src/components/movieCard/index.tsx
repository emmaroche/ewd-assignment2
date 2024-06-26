import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import img from "../../images/film-poster-placeholder.png";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { MoviesContext } from "../../contexts/moviesContext";
import { ListedMovie } from "../../types/interfaces";
import { Box } from "@mui/material";

const styles = {
  card: {
    maxWidth: 300,
    marginTop: 5,
    marginLeft: 7,
    marginRight: 7
  },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};


interface MovieListProps {
  movie: ListedMovie,
  action: (m: ListedMovie) => React.ReactNode;
}

const MovieCard: React.FC<MovieListProps> = (props) => {
  const movie = { ...props.movie, favourite: false, mustWatch: false };
  const { favourites, mustWatchList } = useContext(MoviesContext);

  if (favourites.find((id) => id === movie.id))
    movie.favourite = true;
  if (mustWatchList.find((id) => id === movie.id))
    movie.mustWatch = true;

  return (
    <Box component={Link} to={`/movies/${props.movie.id}`} sx={{
      textDecoration: "none",
    }}>
      <Card sx={styles.card}>
        <CardHeader
          avatar={
            <>
              {movie.favourite ? (
                <Avatar sx={styles.avatar}>
                  <FavoriteIcon />
                </Avatar>
              ) : null}
              {movie.mustWatch ? (
                <Avatar sx={styles.avatar}>
                  <WatchLaterIcon />
                </Avatar>
              ) : null}
            </>
          }
          title={
            <Typography variant="h5" component="p">
              {movie.title}{" "}
            </Typography>
          }
        />
        <CardMedia
          sx={styles.media}
          image={
            props.movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`
              : img
          }
        />
        <CardContent>
          <Grid container spacing={2} alignItems="center" >
            <Grid item xs={6} container alignItems="center">
              <CalendarIcon fontSize="small" color= "primary" />
              <Typography variant="h6" component="p" style={{ marginLeft: "2px" }}>
                {props.movie.release_date}
              </Typography>
            </Grid>
            <Grid item xs={6} container alignItems="center">
              <StarRateIcon  color= "primary" fontSize="small" />
              <Typography variant="h6" component="p" style={{ marginLeft: "3px" }}>
                {props.movie.vote_average}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>

          {props.action(movie)}

          <Button variant="outlined" size="medium" color="primary">
            More Info
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}

export default MovieCard;