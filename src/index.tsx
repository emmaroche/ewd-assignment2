import React, { useState } from "react";
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
import PopularPage from "./pages/popularMoviesPage";
import CastBioPage from './pages/castInfoPage';
import FantasyMoviePage from './pages/fantasyMoviePage';
import SignIn from "./pages/signInPage";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false); // isAuthenticated state

   // Reference to replace state once sucessfully logged in: https://stackoverflow.com/questions/71396596/equivalent-to-redirect-to-login-using-navigate-in-react-router-dom-v6

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/reviews/:id" element={isAuthenticated ? <MovieReviewPage /> : <Navigate to="/signin" replace state={{ from: '/reviews/:id' }} />} />
            <Route path="/cast/:id" element={isAuthenticated ? <CastBioPage /> : <Navigate to="/signin" replace state={{ from: '/cast/:id' }} />} />
            <Route path="/movies/fantasyMovie" element={isAuthenticated ? <FantasyMoviePage /> : <Navigate to="/signin" replace state={{ from: '/movies/fantasyMovie' }} />} />
            <Route path="/reviews/form" element={isAuthenticated ? <AddMovieReviewPage /> : <Navigate to="/signin" replace state={{ from: '/reviews/form' }} />} />
            <Route path="/movies/favourites" element={isAuthenticated ? <FavouriteMoviesPage /> : <Navigate to="/signin" replace state={{ from: '/movies/favourites' }} />} />
            <Route path="/movies/mustWatch" element={isAuthenticated ? <MustWatchMoviesPage /> : <Navigate to="/signin" replace state={{ from: '/movies/mustWatch' }} />} />
            {/* <Route path="/movies/:id" element={ <MoviePage />} /> */}
            <Route path="/movies/:id" element={isAuthenticated ? <MoviePage /> : <Navigate to="/signin" replace state={{ from: '/movies/:id' }} />} />
            <Route path="/movies/upcoming" element={isAuthenticated ? <UpcomingMovie /> : <Navigate to="/signin" replace state={{ from: '/movies/upcoming' }} />} />
            <Route path="/movies/popular" element={isAuthenticated ? <PopularPage /> : <Navigate to="/signin" replace state={{ from: '/movies/popular' }} />} />
            <Route path="/movies/nowPlaying" element={isAuthenticated ? <NowPlayingMoviePage /> : <Navigate to="/signin" replace state={{ from: '/movies/nowPlaying' }} />} />
            <Route path="/signin" element={<SignIn onSignIn={() => setIsAuthenticated(true)} />} />
            {/* <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
             <Route path="/movies/mustWatch" element={<MustWatchMoviesPage />} /> */}
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
