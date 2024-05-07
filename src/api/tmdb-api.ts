export const getMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
    return response.json().then(data => ({
      ...data,
      hasMore: data.page < data.total_pages,
    }));
  })
    .catch((error) => {
      throw error
    });
};

export const getUpcomingMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(json => ({
      results: json.results,
      hasMore: json.page < json.total_pages,
    }));
};

export const getPopularMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(json => ({
      results: json.results,
      hasMore: json.page < json.total_pages,
    }));
};


export const getNowPlayingMovies = (page: number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=${page}`
  )
    .then(res => res.json())
    .then(json => ({
      results: json.results,
      hasMore: json.page < json.total_pages,
    }));
};

export const getMovie = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie data. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovieCast = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get movie cast data. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getCastBio = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(`Failed to get cast bio. Response status: ${response.status}`);
    }
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getSimilarMovies = (id: string) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US`
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getCountries = () => {
  return fetch(
    "https://api.themoviedb.org/3/configuration/countries?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch countries. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getGenres = () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
  ).then((response) => {
    if (!response.ok)
      throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
    return response.json();
  })
    .catch((error) => {
      throw error
    });
};

export const getMovieImages = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error("failed to fetch images");
    }
    return response.json();
  }).then((json) => json.posters)
    .catch((error) => {
      throw error
    });
};

export const getMovieReviews = (id: string | number) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      // console.log(json.results);
      return json.results;
    });
};