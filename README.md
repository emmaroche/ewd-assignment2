# Assignment 2 - React App 

__Name:__ Emma Roche (20088680)

__Video demonstration:__ https://youtu.be/fpgShUvbHso 

This repository contains an implementation of the Movie Fans Web Application using the ReactJS library. 

### Features

+ **Home page** - Landing page that displays different movies to look through and discover.

+ **Now Playing movies page** - Displays the movies that are out right now.
+ **Upcoming movies page** - Displays the movies that are coming out soon.
+ **Popular movies page** - Displays the movies that a lot of people are watching and liking currently.
+ **Add to favourite and/or add to must watch page option:**
   + **Favourites page** - A page where users can keep track of their favourited movies.
   + **Must watch page** - A page where users can keep track of the movies they added to must watch.
+ **Fantasy movie page** - A page where users can create their own 'Dream Movie' by inputting details such as title, overview, genres, release date, runtime, production company(s), ideal cast members, and upload a custom movie poster.
+ **Movie details page** - A page where users can explore a movie's details including its description, genres, runtime, and more. Additionally, users can view the cast members and discover similar movies to watch.
+ **Cast biography page** - A page where users can read the biography of an individual cast member from a movie.
+ **Filter functionality** - Filter movies by title, year, and/or genre.
+ **Sort functionality** - Arrange movies by their ratings from highest to lowest or lowest to highest.
+ **Movie reviews** - Users can view movie reviews for a specific movie, write a review and view their own reviews.
     
### Setup requirements.

1. Ran **npm install** to install the necessary dependencies.
2. Ran **npm run dev** to launch the development server while developing the application.
3. For production deployment, built the app by executing **npm run build** to integrate it with the backend application.

### API endpoints

The TMDB endpoints used in this app:

+ `discover/movie` - Discover list of movies.
  
+ `movie/:id` - Fetches movie details. 
  
+ `movie/${id}/images` - Fetches movie images. 
  
+ `genre/movie/list` - Fetches movie genres.
  
+ `configuration/countries` - Fetches production countries. 
  
+ `movie/${id}/reviews` - Fetches Movie Reviews. 
  
+ `movie/upcoming` - Fetches a list of upcoming movies.
  
+ `movie/now_playing` - Fetches a list of now playing movies. 
  
+ `movie/popular` - Fetches a list of popular movies. 
  
+ `movie/${id}/similar` - Fetches a list of similar movies. 
  
+ `movie/${id}/credits` - Fetches a list of cast members involved in the movie.
  
+ `movie/${id}/person` - Fetches information of the individual cast member. 

Custom endpoints used:

+ `auth/signin` - Handles user sign in authentication.
  
+ `/reviews/${reviewerName}/${movieId}` - Retrieves movie reviews based on the movies's name and movie ID.

+ `/reviews2` - Fetches all movie reviews available in the backend app API.

### Routing

_**All pages bar the home page and movie details pages are protected and require the user to sign in to view them.**_

Routes supported by the app:

+ `/` - Home page that displays various different movies.

+ `/signin` - Displays the sign-in page for authentication to view protected routes.

+ `/movies/upcoming` - Displays upcoming movies.
  
+ `/movies/popular` - Displays popular movies.
  
+ `/movies/nowPlaying` - Displays movies currently playing.
  
+ `/movies/fantasyMovie` - Displays a page dedicated to creating custom fantasy movies.

+ `/movies/favourites` - Displays a list of movies that were added to favourites.
  
+ `/movies/mustWatch` - Displays a list of movies that were flagged as must-watch.

+ `/movies/:id` - Displays the details of a specific movie, including its overview, cast, and similar movies.

+ `/cast/:id` - Displays individual cast member information.

+ `/reviews/:id` - Displays the reviews of a specific movie.
  
+ `/reviews/form` - Provides a form to add a review for a movie.

+ `/r` - Displays reviews from the backend app API.

+ `*` - Redirects to the home page if the URL doesn't match any defined routes.

### Assignment 1 integration

CDK GitHub Project: [Link](https://github.com/emmaroche/ewd-assignment2-cdk.git)

+ Frontend deployment to AWS (S3).
+ Frontend CDN deployment to AWS (CloudFront).
+ Movie Reviews display from backend App API.
+ Authentication (Sign in) from backend Auth API.

### Independent learning 

Listed below are the features/functionalities I added through independent learning, along with the relevant source code filenames and references to online resources that helped me:

1. **Private Routes Implementation:**
   - Source Code Filenames: `index.tsx` and `signInPage.tsx`
   - Description: Used Stack Overflow ([Link](https://stackoverflow.com/questions/72163183/how-can-i-redirect-to-previous-page-after-login-in-react-router)) to help me implement private routes that redirect users back to the page they tried to access once they are signed in/authenticated.
   - Techniques used through this resource:
     - Used React Router's `useNavigate` and `useLocation` hooks to access navigation functionalities and location state.
     - Implemented redirection logic based on the location state to redirect users to the last attempted page after signing in.
    
2. **Image Upload Feature:**
   - Source Code Filename: `fantasyMovieForm/index.tsx`
   - Description: Implemented image upload functionality on the fantasy movie page with guidance from Stack Overflow ([Link](https://stackoverflow.com/questions/43692479/how-to-upload-an-image-in-react-js)).
   - Techniques used through this resource:
     - Used the `URL.createObjectURL()` method to create a local URL for the uploaded image file, allowing for previewing the image before uploading it.
     - Implemented an event handler function `handleImageUpload` to handle the file selection and update the component state with the local URL of the uploaded image.
       
3. **Deleting Fantasy Movies:**
   - Source Code Filename: `fantasyMovieForm/index.tsx`
   - Description: Used Stack Overflow ([Link](https://stackoverflow.com/questions/36326612/how-to-delete-an-item-from-state-array)) to help implement the functionality for deleting movies from the fantasy movie page.
   - Techniques used through this resource:
     - Implemented an event handler function `handleDelete` that removes the selected movie from the state array using the `filter` method, based on the index of the movie item to be deleted.
    
4. **Filtering Movies by Date:**
   - Source Code Filenames: `filterMoviesCard/index.tsx` and `movieFilterUI/index.tsx`
   - Description: Implemented date filtering functionality with the help of Material-UI documentation ([Link 1](https://mui.com/x/react-date-pickers/getting-started/), [Link 2](https://mui.com/x/react-date-pickers/date-picker/), [Link 3](https://mui.com/x/react-date-pickers/base-concepts/)) and Stack Overflow ([Link](https://stackoverflow.com/questions/69265989/format-date-with-date-fns), [Link 2](https://stackoverflow.com/questions/50556433/material-ui-datepicker-enable-only-year), [Link 3](https://stackoverflow.com/questions/47066555/remove-time-after-converting-date-toisostring)).
   - Techniques used through these resources:
     - Implemented a function to handle changes in the selected date, converting it to a string format without time information by using the toISOString method and splitting the string at the "T" character to isolate the date part only.
     - Created a custom `dateFilter` function that takes a movie object and a date value as input.
     - Utilised date parsing functions from the `date-fns` library (`parseISO`, `getYear`) to extract the release year from the movie's release date and the filter year from the selected date.
     - Added code that compares the release year of a movie to the selected filter year.
       
5. **Sorting Movies by Vote Count:**
   - Source Code Filenames: `homePage.tsx`, `nowPlayingMoviesPage.tsx`, `mustWatchPage.tsx`, `favoriteMoviesPage.tsx`, `popularMoviespage.tsx` and `upcomingMoviesPage.tsx`
   - Description: Implemented sorting functionality for movies by vote count with help from a blog post ([Link](https://blog.devgenius.io/react-search-filter-sort-by-and-sort-order-66e4835b0537)).
   - Techniques used through this resource:
     - Created a `sortMovies` function that takes an array of displayed movies and a sort filter as parameters.
     - Utilised the `sort` method to sort the movies based on their vote average (`vote_average`).
     - Implemented sorting logic for both ascending and descending order based on the selected sort filter.
    
6. **Pagination Implementation:**
   - Source Code Filenames: `homePage.tsx`, `nowPlayingMoviesPage.tsx`, `popularMoviespage.tsx` and `upcomingMoviesPage.tsx` and `movieDetailsPage.tsx`
   - Description: Implemented pagination for main movie pages and movie details page pagination for the cast and similar movie list using guidance from the TanStack Query documentation ([Link](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries?from=reactQueryV3)) and Stack Overflow ([Link](https://stackoverflow.com/questions/42761068/paginate-javascript-array)).

I have also placed these links within comments above the associated code.