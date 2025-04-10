
import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      >
        {/* Orbit */}
        <motion.div 
          className="absolute inset-0 border-2 border-soul-amber/30 rounded-full"
        />
        
        {/* Planet */}
        <motion.div
          className="absolute w-4 h-4 bg-soul-amber rounded-full"
          animate={{ 
            x: [0, 16, 0, -16, 0],
            y: [16, 0, -16, 0, 16],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
