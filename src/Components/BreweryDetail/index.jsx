// BreweryDetailComponent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBreweryDetails, getBreweryReviews, addReview } from './api';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, description: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreweryData = async () => {
      try {
        const [breweryData, reviewsData] = await Promise.all([
          getBreweryDetails(id),
          getBreweryReviews(id)
        ]);
        setBrewery(breweryData);
        setReviews(reviewsData);
      } catch (err) {
        setError('Failed to fetch brewery data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreweryData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const addedReview = await addReview(id, newReview);
      setReviews([...reviews, addedReview]);
      setNewReview({ rating: 5, description: '' });
    } catch (err) {
      setError('Failed to add review. Please try again.');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!brewery) return <p>Brewery not found.</p>;

  return (
    <div className="brewery-detail">
      <h1>{brewery.name}</h1>
      <p>Address: {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
      <p>Phone: {brewery.phone || 'N/A'}</p>
      <p>Website: {brewery.website_url ? <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a> : 'N/A'}</p>
      <p>Type: {brewery.brewery_type}</p>

      <h2>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <p>Rating: {review.rating}/5</p>
              <p>{review.description}</p>
            </li>
          ))}
        </ul>
      )}

      <h3>Add a Review</h3>
      <form onSubmit={handleReviewSubmit}>
        <select
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        <textarea
          value={newReview.description}
          onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
          placeholder="Write your review here"
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default BreweryDetail;