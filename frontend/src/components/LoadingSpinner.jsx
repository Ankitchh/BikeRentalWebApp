import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-700 via-indigo-800 to-purple-900 backdrop-blur-sm">
      <motion.div
        className="relative w-24 h-24 flex items-center justify-center"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      >
        <div className="absolute w-full h-full rounded-full border-4 border-t-transparent border-white animate-spin-slow" />
        <motion.div
          className="absolute w-16 h-16 rounded-full border-4 border-b-purple-500 border-l-transparent border-r-purple-300 border-t-purple-400 shadow-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
        />
      </motion.div>
      <span className="absolute bottom-20 text-white text-sm tracking-widest animate-pulse">
        Loading, please wait...
      </span>
    </div>
  );
};

export default LoadingSpinner;
