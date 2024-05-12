import React, { useState, useEffect } from 'react';
import { getReviews2 } from '../api/custom-api';
import Header from '../components/headerMovieList';
import { Card, CardContent, Typography, Box, Rating } from '@mui/material';

type MovieReview = {
  movieId: number;
  movieName: string;
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
          console.error('Fetched reviews error:', fetchedReviews);
        }
      });
  }, []);

  return (
    <>
      <Header title="Your Reviews" />
      {reviews && reviews.map((review, index) => (
        <Box key={index} sx={{ maxWidth: 345, marginBottom: 2 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                {review.movieName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {review.content}
              </Typography>
              {/* Reference for displaying rating: https://mui.com/material-ui/react-rating/ */}
              <Rating name="read-only" value={review.rating} readOnly />
              <Typography variant="caption" display="block" gutterBottom>
                Review Date: {review.reviewDate}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default ReviewsPage;