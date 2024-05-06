import React, { useState } from "react";
import { ListedMovie, MovieT,  Review } from "../types/interfaces"; //Add Review interface

interface MovieContextInterface {
    addReview(props: MovieT, review: Review): unknown;
    favourites: number[];
    addToFavourites: ((movie: ListedMovie) => void);
    removeFromFavourites: ((movie: ListedMovie) => void);
    mustWatchList: number[]; 
    addToMustWatch: ((movie: ListedMovie) => void); 
    removeFromMustWatch: ((movie: ListedMovie) => void);
}

const initialContextState = {
    favourites: [],
    addToFavourites: (movie: ListedMovie) => {movie.id },
    removeFromFavourites: (movie: ListedMovie) => { movie.id},
    addReview: (props: MovieT, review: Review) => {},
    mustWatchList: [], 
    addToMustWatch: (movie: ListedMovie) => { movie.id }, 
    removeFromMustWatch: (movie: ListedMovie) => { movie.id},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = (props) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] )  // NEW
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatchList, setMustWatchList] = useState<number[]>([]); // NEW

    const addToFavourites = (movie: ListedMovie) => {
        let updatedFavourites = [...favourites];
        if (!favourites.includes(movie.id)) {
            updatedFavourites.push(movie.id);
        }
        setFavourites(updatedFavourites);
    };

    // We will use this function in a later section
    const removeFromFavourites = (movie: ListedMovie) => {
        setFavourites(favourites.filter((mId) => mId !== movie.id));
    };

    const removeFromMustWatch = (movie: ListedMovie) => {
      setFavourites(mustWatchList.filter((mId) => mId !== movie.id));
  };

    const addReview = (movie: { id: any; }, review: any) => {   
        setMyReviews( {...myReviews, [movie.id]: review } )
      };
    
      const addToMustWatch = (movie: ListedMovie) => { 
        setMustWatchList((prevList) => {
            const newList = [...prevList, movie.id];
            console.log(newList);
            return newList;
        });
    };
    

     return (
        <MoviesContext.Provider
          value={{
            favourites,
            addToFavourites,
            removeFromFavourites,
            addReview, 
            mustWatchList, 
            addToMustWatch, 
            removeFromMustWatch
          }}
        >
          {props.children}
        </MoviesContext.Provider>
      );
    };
    
    export default MoviesContextProvider;