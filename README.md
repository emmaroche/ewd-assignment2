# Assignment 2 - React App 

__Name:__ Emma Roche (20088680)

__Video demonstration:__ 

This repository contains an implementation of the Movie Fans Web Application using the ReactJS library. 

### Features
Below is a list of the new features I added and modifications to existing features that I made to the lab work to the Movies Fan app. 

+ **Home page** - The first page that displays different movies for a user to look through and discover.

+ **Now Playing movies page** -  Displays the movies that are out right now.
+ **Upcoming movies page** - Displays the movies that are coming out soon.
+ **Popular movies page** - Displays the movies that a lot of people are watching and liking currently.
+ **Favourites page** - A page where users can keep track of their favourite movies.
+ **Must watch page** - A page where users can keep track of the movies they want to watch.
+ **Fantasy movie page** - A page where users can create their own 'Dream Movie' by inputing details such as title, overview, genres, release date, runtime, production company(s), ideal cast members, and even upload a custom movie poster.
+ **Movie details page** - A page where users can explore a movie's details including its description, genres, runtime, and more. Additionally, users can view the cast memebers and discover similar movies to watch.
+ **Cast biography page** - A page where users can read about the individual cast member from a movie.
+ **Filter functionality** - Search for movies by title, year, and/or genre.
+ **Sort functionality** - Arrange movies by their ratings from highest to lowest or lowest to highest.
+ **Add to favourite and/or add to must watch page option**
+ **View movie reviews for a specific movie**
+ **Add a review for a specific movie**
     
### Setup requirements.

1. Ran **npm install** to install the necessary dependencies.
2. Launched the development server by running **npm run dev**.
3. For production deployment, built the app by executing **npm run build** in order to integrate it with the backend application.

### API endpoints

The TMDB endpoints used in this app:

+ `discover/movie` - Discover list of movies 
  
+ `movie/:id` - Fetches movie details 
  
+ `movie/${id}/images` - Fetches movie images 
  
+ `genre/movie/list` - Fetches movie genres
  
+ `configuration/countries` - Fetches production countries 
  
+ `movie/${id}/reviews` - Fetches Movie Reviews 
  
+ `movie/upcoming` - Fetches a list of upcoming movies 
  
+ `movie/now_playing` - Fetches a list of now playing movies 
  
+ `movie/popular` - Fetches a list of popular movies 
  
+ `movie/${id}/similar` - Fetches a list of similar movies 
  
+ `movie/${id}/credits` - Fetches a list of cast members involved in the movie 
  
+ `movie/${id}/person` - Fetches information of the individual cast member 

### Routing

_**All pages bar the home page are protected and require the user to sign in to view them.**_

Routes supported by the app:

+ `/reviews/:id` - Displays the reviews of a specific movie.

+ `/cast/:id` - Shows the biography and information about the cast of a particular movie.
  
+ `/movies/fantasyMovie` - Presents a page dedicated to creating fantasy movies.
  
+ `/reviews/form` - Provides a form to add a review for a movie.
  
+ `/movies/favourites` - Displays a list of movies that were added to favourite.
  
+ `/movies/mustWatch` - Displays a list of movies that were flagged as must-watch.
  
+ `/movies/:id` - Displays the details of a specific movie, including its overview, cast, and similar movies.
  
+ `/movies/upcoming` - Displays upcoming movies.
  
+ `/movies/popular` - Displays popular movies.
  
+ `/movies/nowPlaying` - Displays movies currently playing.
  
+ `/signin` - Displays the sign-in page for authentication to view protected routes.
  
+ `/` - The home page that displays various movies.
  
+ `*` - Redirects to the home page if the URL doesn't match any defined routes.

### Assignment 1 integration

+	Frontend deployment to AWS (S3).
+ Frontend CDN deployment to AWS (CloudFront)
+ Authentication (Sign in)

### Independent learning 


