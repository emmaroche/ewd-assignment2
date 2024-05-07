import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieT } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import MovieReviews from '../movieReviews'
import SimilarMovie from '../similarMovieList';
import MovieCast from '../movieCastList';
import { Grid } from '@mui/material';

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        top: 70,
        right: 20,
        zIndex: 10000,
    },
};

const MovieDetails: React.FC<MovieT> = (props) => {
    const movie = props;
    const { similarMovies, movieCast } = props;
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Typography variant="h5" component="h3" mt={2} mb={2}>
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={{ ...styles.chipLabel, margin: 1 }} color="primary" />
                </li>
                {movie.genres.map((g) => (
                    <li key={g.name}>
                        <Chip label={g.name} sx={{ margin: 1 }} />
                    </li>
                ))}
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} sx={{ margin: 1 }} />
                <Chip
                    icon={<MonetizationIcon />}
                    label={`${movie.revenue.toLocaleString()}`}
                    sx={{ margin: 1 }}
                />
                <Chip
                    icon={<StarRate />}
                    label={`${movie.vote_average} (${movie.vote_count}`}
                    sx={{ margin: 1 }}
                />
                <Chip label={`Released: ${movie.release_date}`} sx={{ margin: 1 }} />
                <Chip label={`Production Countries: ${movie.production_countries ? movie.production_countries.map(country => country.name).join(', ') : 'N/A'}`} sx={{ margin: 1 }} />
                <Chip
                    label={`Production Companies: ${movie.production_companies ? movie.production_companies.map(company => company.name).join(', ') : 'N/A'}`}
                    sx={{ margin: 1 }}
                />
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews {...movie} />
            </Drawer>

            <Typography variant="h5" component="h3" mt={2} mb={2}>
                Cast
            </Typography>
            <Grid container spacing={2}>
                {movieCast?.cast?.map((cast: any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={cast.cast_id}>
                        <MovieCast cast={cast}  />
                    </Grid>
                ))}
            </Grid>
            <Typography variant="h5" component="h3" mt={2} mb={2}>
                Similar Movies
            </Typography>
            <Grid container spacing={2}>
                {similarMovies?.results?.map((movie: any) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <SimilarMovie movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
export default MovieDetails;