import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs"; // for readable dates

const InfiniteReviews = () => {
  const scrollRef = useRef(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/data/reviews`
        );
        const data = response.data;

        // Optionally filter approved reviews only
        const approvedReviews = data.filter((r) => r.approved);
        setReviews(approvedReviews);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="relative overflow-hidden py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">
          What Our Customers Say
        </h2>

        <motion.div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto px-2 hide-scrollbar"
          initial={{ x: 0 }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
          }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <ReviewCard key={`${review._id}-${index}`} review={review} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <motion.div
      whileHover={{
        y: -10,
        boxShadow:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }}
      className="flex-shrink-0 w-72 md:w-80 bg-white rounded-xl shadow p-6"
    >
      <div className="flex items-center mb-4">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-medium text-lg">{review.name}</h4>
          <div className="flex mt-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < review.rating
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-neutral-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-neutral-700 mb-4 line-clamp-3">{review.description}</p>
      <div className="text-sm text-neutral-400">
        {dayjs(review.createdAt).format("MMM D, YYYY")}
      </div>
    </motion.div>
  );
};

export default InfiniteReviews;
