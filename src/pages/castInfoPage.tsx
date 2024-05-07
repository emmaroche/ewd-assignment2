import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCastBio } from '../api/tmdb-api';
import { Grid, Typography, Paper, Box } from '@mui/material';
import ActorHeader from '../components/actorHeader'; 
import { Actor } from "../types/interfaces"; 

const ActorBioPage: React.FC = ()  => {
  const { id } = useParams<{ id: string }>();

  const { data: actorBio, isLoading, isError, error } = useQuery<Actor, Error>(['actorBio', id], () => {
    if (id === undefined) {
      throw new Error('Actor ID is undefined');
    }
    return getCastBio(id);
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !actorBio) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return (
    <>
      <Box mb={2}>
        <ActorHeader {...actorBio} />
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <img
            src={`https://image.tmdb.org/t/p/w500/${actorBio.profile_path}`}
            alt={actorBio.name}
            style={{ width: '100%', height: 'auto' }}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Biography
            </Typography>
            <Typography variant="body1">
              {actorBio.biography}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default ActorBioPage;