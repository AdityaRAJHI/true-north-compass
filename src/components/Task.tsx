
import React from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onClick: (id: string) => void;
}

const Task: React.FC<TaskProps> = ({ id, title, isCompleted, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "p-4 rounded-xl mb-3 border flex justify-between items-center transition-all duration-300 cursor-pointer organic-shadow",
        isCompleted
          ? "bg-soul-sage/30 border-soul-sage"
          : "bg-white border-soul-peach/30 hover:border-soul-amber/50"
      )}
      onClick={() => onClick(id)}
    >
      <span
        className={cn(
          "transition-all duration-300",
          isCompleted ? "text-muted-foreground line-through" : "text-foreground"
        )}
      >
        {title}
      </span>
      <span
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300",
          isCompleted
            ? "bg-soul-forest text-white"
            : "bg-soul-cream text-foreground"
        )}
      >
        {isCompleted ? <Check size={14} /> : <ChevronRight size={14} />}
      </span>
    </motion.div>
  );
};

export default Task;
