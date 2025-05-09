import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const StarRating = ({ rating, setRating }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1 mt-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.95 }}
          className="text-yellow-400"
        >
          <Star
            className={`w-6 h-6 transition-colors ${
              (hovered || rating) >= star
                ? "fill-yellow-400"
                : "fill-none stroke-yellow-400"
            }`}
          />
        </motion.button>
      ))}
    </div>
  );
};

const CommentSection = () => {
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);
  const { user, login } = useAuth();

  const handleAddComment = (e) => {
    e.preventDefault();

    if (!user) {
      login();
      return;
    }

    if (!newComment.trim() || rating < 1 || rating > 5) {
      toast.error("Please enter a comment and a rating (1–5 stars).");
      return;
    }

    console.log("Submitted comment:", newComment, "Rating:", rating);

    setNewComment("");
    setRating(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
    >
      <h3 className="text-2xl font-semibold mb-6">Comments & Feedback</h3>

      <form onSubmit={handleAddComment} className="mb-8">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <img
              src={
                user?.profileImage ||
                "https://images.pexels.com/photos/1722198/pexels-photo-1722198.jpeg?auto=compress&cs=tinysrgb&w=300"
              }
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>

          <div className="flex-grow relative">
            <textarea
              className="input min-h-[100px] w-full resize-none"
              placeholder={
                user ? "Share your thoughts..." : "Login to comment..."
              }
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!user}
            ></textarea>

            {/* Star Rating Component */}
            <StarRating rating={rating} setRating={setRating} />

            <button
              type="submit"
              className="absolute bottom-3 right-3 text-primary-500 hover:text-primary-600 disabled:text-neutral-400"
              disabled={!user || newComment.trim() === ""}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default CommentSection;
