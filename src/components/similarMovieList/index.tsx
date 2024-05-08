import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import img from "../../images/film-poster-placeholder.png";


const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
  };
  
const SimilarMovie: React.FC<any> = ({ movie }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={styles.media}
        image={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h4">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {movie.overview}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SimilarMovie;