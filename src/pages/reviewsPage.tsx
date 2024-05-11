import React, { useState, useEffect } from 'react';
import { getReviews2 } from '../api/custom-api';

type MovieReview = {
  movieId: number;
  reviewerName: string;
  reviewDate: string;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<MovieReview[] | null>(null);

  useEffect(() => {
    getReviews2()
      .then((fetchedReviews) => {
        if (Array.isArray(fetchedReviews.data)) {
          setReviews(fetchedReviews.data);
        } else {
          console.error('Fetched reviews is not an array:', fetchedReviews);
        }
      });
  }, []);
  return (
    <>
      {reviews && reviews.map((review, index) => (
        <div key={index}>
          <h2>{review.reviewerName}</h2>
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
          <p>Review Date: {review.reviewDate}</p>
        </div>
      ))}
    </>
  );
};

export default ReviewsPage;
