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

// Bike images for the dynamic backgrounds

const featureImage =
  "https://images.unsplash.com/photo-1626841845777-3ad871afb8f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

const bikeImages = [
  "https://images.unsplash.com/photo-1626841845777-3ad871afb8f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1694001953786-6008e0476822?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollYProgress } = useScroll();
  const [bikeTypes, setBikeTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bike types from the API

  useEffect(() => {
    const fetchBikes = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/data/bikes`
        );
        setBikeTypes(res.data);
      } catch (error) {
        console.error("Error fetching bikes:", error);
      } finally {
        setTimeout(() => setLoading(false), 800); // Only set it once
      }
    };
    fetchBikes();
  }, []);

 

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((value) => {
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
          {/* Hero Section with Dynamic Background */}
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

            {/* Hero Content */}
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

              {/* Scroll Down Indicator */}
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

          {/* Our Bikes Section */}
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
                {bikeTypes.map((bike, i) => (
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

          {/* How It Works Section */}
          <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  How It Works
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Renting a bike with us is simple and hassle-free. Follow these
                  steps to begin your adventure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <MapPin className="w-8 h-8 text-primary-600" />,
                    title: "Choose Location",
                    desc: "Select your pick-up and drop-off location from our multiple stations across the city.",
                  },
                  {
                    icon: <Calendar className="w-8 h-8 text-primary-600" />,
                    title: "Select Date & Bike",
                    desc: "Choose your rental dates and the perfect bike for your adventure from our diverse fleet.",
                  },
                  {
                    icon: <Shield className="w-8 h-8 text-primary-600" />,
                    title: "Enjoy Safe Riding",
                    desc: "Pick up your bike, get a quick safety briefing, and you're ready to explore the city.",
                  },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 * idx }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-neutral-600">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Feature Highlights Section */}
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <motion.img
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    src={featureImage}
                    alt="Bike Feature Highlights"
                    className="rounded-2xl shadow-xl w-full h-auto object-cover"
                  />
                </div>

                <div className="lg:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Why Choose BikeRental?
                  </h2>
                  {[
                    {
                      icon: <Star />,
                      title: "Premium Bikes",
                      desc: "Top-quality, well-maintained bikes ensure comfort and safety.",
                    },
                    {
                      icon: <MapPin />,
                      title: "Multiple Locations",
                      desc: "Convenient pick-up/drop-off points across the city.",
                    },
                    {
                      icon: <Calendar />,
                      title: "Flexible Booking",
                      desc: "Easy online booking with modifications up to 24h in advance.",
                    },
                    {
                      icon: <Shield />,
                      title: "Safety First",
                      desc: "Includes helmets, safety gear, and brief orientation.",
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 * idx }}
                      className="flex items-start mb-6"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                        {React.cloneElement(item.icon, {
                          className: "w-6 h-6 text-primary-600",
                        })}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-neutral-600">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-primary flex items-center mt-8"
                  >
                    Learn More <ArrowRight className="ml-2 w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </section>

          {/* Booking Section */}
          <section className="py-20 bg-primary-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Book Your Bike Now
                </h2>
                <p className="text-neutral-600 max-w-2xl mx-auto">
                  Complete the form below to reserve your bike and start your
                  adventure.
                </p>
              </div>
              <BookingForm />
            </div>
          </section>

          {/* Reviews Section */}
          <section className="py-20 bg-white">
            <InfiniteReviews />
          </section>

          {/* Comment Section */}
          <section className="py-20 bg-neutral-50">
            <div className="container mx-auto px-4">
              <CommentSection />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary-600 text-white">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Adventure?
              </h2>
              <p className="text-xl max-w-2xl mx-auto mb-8">
                Join thousands of satisfied customers who have explored the city
                with our bikes.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn bg-white text-primary-600 hover:bg-neutral-100 text-lg px-8 py-4"
              >
                Book Now and Save 10%
              </motion.button>
            </div>
          </section>
        </div>
      )}
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
