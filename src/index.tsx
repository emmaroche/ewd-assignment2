import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import UpcomingMovie from "./pages/upcomingMoviesPage";
import FavouriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import MustWatchMoviesPage from "./pages/mustWatchPage";
import NowPlayingMoviePage from "./pages/nowPlayingMoviesPage";
import TopRatedPage from "./pages/topRatedMoviesPage";
import CastBioPage from './pages/castInfoPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>

          <Routes>
            <Route path="/reviews/:id" element={<MovieReviewPage />} />
            <Route path="/actors/:id" element={<CastBioPage/>} />
            <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
            <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
            <Route path="/movies/mustWatch" element={<MustWatchMoviesPage />} />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/movies/upcoming" element={<UpcomingMovie />} />
            <Route path="/movies/topRated" element={<TopRatedPage />} />
            <Route path="/movies/nowPlaying" element={<NowPlayingMoviePage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>

        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)