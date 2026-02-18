import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LoaderButton = ({ to, className, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);

    // Simulate async operation (e.g. 1.5s loading)
    setTimeout(() => {
      // Navigate after animation "completes"
      navigate(to);
    }, 2000); 
  };

  return (
    <motion.button
      className={`relative overflow-hidden flex items-center justify-center ${className}`}
      onClick={handleClick}
      // "layout" allows smooth width/height changes if needed, 
      // though here we mainly keep the same size or let content dictate it.
      layout
      transition={{ duration: 0.4, type: "spring" }}
      // Disable interaction while loading
      disabled={isLoading}
      style={{ minWidth: "140px", minHeight: "44px" }}
    >
      {/* Background "Layers" Animation - Acts as Progress Bar */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="absolute inset-0 bg-white/30"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "linear" }}
          />
        )}
      </AnimatePresence>

      {/* "Lines" Animation - Both Left to Right */}
      <AnimatePresence>
        {isLoading && (
          <>
            <motion.div
              className="absolute top-0 left-0 h-[2px] bg-white w-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
             <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-white w-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear", delay: 0.5 }} // Staggered slightly
            />
          </>
        )}
      </AnimatePresence>

      {/* Content Switch: "Create New" <-> "Loading" */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2"
          >
            {/* Simple spinner or just text */}
            <span>Loading...</span>
            {/* Optional: Add a small spinner svg here if desired */}
          </motion.span>
        ) : (
          <motion.span
            key="content"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            {children}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default LoaderButton;
