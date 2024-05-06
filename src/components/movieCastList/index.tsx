import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import img from '../../images/film-poster-placeholder.png';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const styles = {
    card: { maxWidth: 345 },
    media: { height: 500 },
    avatar: {
      backgroundColor: "rgb(255, 0, 0)",
    },
};

const MovieCast: React.FC<any> = ({ actor }) => {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={styles.media}
          image={
            actor.profile_path
              ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
              : img
          }
        />
        <CardContent>
          <Box display="flex" flexDirection="column" justifyContent="flex-start">
            <Typography gutterBottom variant="h5" component="h4">
              {actor.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              {actor.character}
            </Typography>
     
              <Link to={`/actors/${actor.id}`}>
                <Button variant="outlined" size="medium" color="primary">
                  View Bios
                </Button>
              </Link>
   
          </Box>
        </CardContent>
      </Card>
    );
  };

export default MovieCast;