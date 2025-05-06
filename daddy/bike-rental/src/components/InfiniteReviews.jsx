import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    text: 'The bikes were in perfect condition and the service was exceptional. We had an amazing day exploring the city!',
    date: 'June 12, 2024'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4,
    text: 'Great experience overall. The booking process was simple and the bikes were comfortable. Would rent again!',
    date: 'May 28, 2024'
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    text: 'Absolutely loved the electric bike option. Made getting around the hills so much easier!',
    date: 'May 15, 2024'
  },
  {
    id: 4,
    name: 'James Wilson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    text: 'The best bike rental service I\'ve used in any city. The staff was friendly and the equipment was top-notch.',
    date: 'April 30, 2024'
  },
  {
    id: 5,
    name: 'Olivia Chen',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4,
    text: 'Had a minor issue with my initial bike, but the staff quickly replaced it. Great customer service!',
    date: 'April 22, 2024'
  },
  {
    id: 6,
    name: 'Daniel Brown',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 5,
    text: 'The city tour package was absolutely worth it! Our guide was knowledgeable and the route was perfect.',
    date: 'April 10, 2024'
  },
];

const InfiniteReviews = () => {
  const scrollRef = useRef(null);
  
  // Duplicate reviews for infinite scrolling effect
  const duplicatedReviews = [...reviews, ...reviews];
  
  return (
    <div className="relative overflow-hidden py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
      </div>
      
      <div className="w-full overflow-hidden">
        <div 
          ref={scrollRef}
          className="infinite-carousel pb-4"
        >
          {duplicatedReviews.map((review, index) => (
            <ReviewCard key={`${review.id}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <motion.div 
      whileHover={{ 
        y: -10,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
      className="flex-shrink-0 w-full md:w-80 p-4"
    >
      <div className="bg-white rounded-xl shadow-md p-6 h-full flex flex-col">
        <div className="flex items-center mb-4">
          <img 
            src={review.avatar} 
            alt={review.name} 
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-4">
            <h4 className="font-medium">{review.name}</h4>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="text-neutral-700 flex-grow mb-4">{review.text}</p>
        <div className="text-neutral-500 text-sm">{review.date}</div>
      </div>
    </motion.div>
  );
};

export default InfiniteReviews;