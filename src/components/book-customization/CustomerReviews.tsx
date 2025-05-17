import React from "react";

interface Review {
  author: string;
  rating: number;
  text: string;
}

interface CustomerReviewsProps {
  reviews: Review[];
  aggregateRating: { ratingValue: string; reviewCount: number };
}

const CustomerReviews: React.FC<CustomerReviewsProps> = ({ reviews, aggregateRating }) => (
  <div className="mt-16">
    <h2 className="text-2xl font-bold mb-4">What Our Customers Say</h2>
    <div className="grid gap-6 md:grid-cols-3">
      {reviews.map((review, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow p-6 flex flex-col">
          <div className="flex items-center mb-2">
            <span className="font-semibold text-lg mr-2">{review.author}</span>
            <span className="text-yellow-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span>
          </div>
          <p className="text-muted-foreground flex-1">{review.text}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 text-sm text-muted-foreground">
      Average rating: <strong>{aggregateRating.ratingValue}</strong> ({aggregateRating.reviewCount} reviews)
    </div>
  </div>
);

export default CustomerReviews; 