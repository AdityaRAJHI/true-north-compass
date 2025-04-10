
import React from "react";
import { motion } from "framer-motion";

const EarthAnimation = () => {
  return (
    <div className="relative w-24 h-24 mx-auto">
      {/* Earth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-700 rounded-full shadow-lg"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Continents */}
        <motion.div 
          className="absolute top-3 left-5 w-3 h-5 bg-green-600/70 rounded-full" 
          style={{ borderRadius: "50% 60% 50% 40%" }}
        />
        <motion.div 
          className="absolute top-8 right-8 w-5 h-3 bg-green-600/70 rounded-full" 
          style={{ borderRadius: "60% 50% 40% 50%" }}
        />
        <motion.div 
          className="absolute bottom-4 left-7 w-7 h-4 bg-green-600/70 rounded-full" 
          style={{ borderRadius: "40% 50% 60% 50%" }}
        />
        <motion.div 
          className="absolute top-14 left-8 w-4 h-2 bg-green-600/70 rounded-full" 
          style={{ borderRadius: "50% 40% 50% 60%" }}
        />
      </motion.div>
      
      {/* Orbit */}
      <motion.div
        className="absolute inset-0 border-2 border-white/20 rounded-full"
        style={{ margin: "-5px" }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default EarthAnimation;
