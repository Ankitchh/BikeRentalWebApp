import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { toast, ToastContainer, Slide } from "react-toastify";
import {
  ChevronDown,
  ArrowRight,
  MapPin,
  Calendar,
  Shield,
  Star,
} from "lucide-react";
import BookingForm from "../components/BookingForm";
import InfiniteReviews from "../components/InfiniteReviews";
import CommentSection from "../components/CommentSection";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Chatbot from "../components/Chatbot";

// Bike images
const featureImage =
  "https://images.unsplash.com/photo-1626841845777-3ad871afb8f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const bikeImages = [
  featureImage,
  "https://images.unsplash.com/photo-1694001953786-6008e0476822?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const [bikeTypes, setBikeTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch bike types
  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/data/bikes`
        );
        const data = res.data;

        // ✅ Safeguard the response
        if (Array.isArray(data)) {
          setBikeTypes(data);
        } else if (Array.isArray(data.bikes)) {
          setBikeTypes(data.bikes);
        } else {
          console.error("Unexpected response format:", data);
          toast.error("Bike data format is invalid.");
          setBikeTypes([]);
        }
      } catch (error) {
        console.error("Error fetching bikes:", error);
        toast.error("Failed to load bikes. Please try again later.");
      } finally {
        setTimeout(() => setLoading(false), 800);
      }
    };

    fetchBikes();
  }, []);

  // ✅ Scroll background image handler using updated Framer Motion API
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      const newIndex = value < 0.04 ? 0 : 1;
      if (newIndex !== currentImageIndex) {
        setCurrentImageIndex(newIndex);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, currentImageIndex]);

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 50]);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="min-h-screen">
          {/* Hero Section */}
          <section className="relative h-screen overflow-hidden">
            {bikeImages.map((image, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: currentImageIndex === index ? 1 : 0,
                  transition: { duration: 1.5 },
                }}
                style={{ backgroundImage: `url(${image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              </motion.div>
            ))}
            <Chatbot/>
            <div className="container mx-auto px-4 relative h-full flex flex-col justify-center items-center text-center text-white z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-4">
                  Explore the City on Two Wheels
                </h1>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
                  Premium bike rentals for every adventure. Easy booking,
                  flexible options.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  Book Your Ride Now
                </motion.button>
              </motion.div>

              <motion.div className="absolute bottom-10" style={{ opacity, y }}>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex flex-col items-center"
                >
                  <p className="mb-2">Scroll to explore</p>
                  <ChevronDown className="w-6 h-6" />
                </motion.div>
              </motion.div>
            </div>
          </section>

          {/* Bike Collection */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Our Bike Collection
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Choose from our wide range of high-quality bikes for any type
                  of adventure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {Array.isArray(bikeTypes) &&
                  bikeTypes.map((bike, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ y: -10 }}
                      className="card overflow-hidden"
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={bike.image}
                          alt={bike.bikeModel}
                          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-xl font-semibold">
                            {bike.bikeModel}
                          </h3>
                          <span className="text-primary-600 font-bold">
                            ₹{bike.ratePerDay}/day
                          </span>
                        </div>
                        <p className="text-neutral-600 mb-4">
                          {bike.description}
                        </p>
                        <button className="btn btn-outline w-full">
                          Select Bike
                        </button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          </section>
          <section>
            <BookingForm />
          </section>
          <section>
            <InfiniteReviews />
          </section>
          <section>
            <CommentSection />
          </section>
        </div>
      )}

      {/* Toast Notifications */}
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={800}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </>
  );
};

export default Home;
