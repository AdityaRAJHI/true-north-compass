
import React from "react";
import { motion } from "framer-motion";

const LoadingAnimation = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <motion.div
        className="flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-soul-amber/60"
            animate={{ y: ["0%", "-50%", "0%"] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;
