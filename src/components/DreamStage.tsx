
import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DreamStageProps {
  title: string;
  description: string;
  timeframe: string;
  isActive: boolean;
  progress: number;
  onClick: () => void;
}

const DreamStage: React.FC<DreamStageProps> = ({
  title,
  description,
  timeframe,
  isActive,
  progress,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "p-5 mb-4 rounded-2xl cursor-pointer organic-shadow border transition-all duration-300",
        isActive
          ? "bg-gradient-dream border-soul-sage"
          : "bg-white border-soul-peach/30"
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-medium">{title}</h3>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>{timeframe}</span>
          <ChevronRight size={16} className="ml-1" />
        </div>
      </div>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-soul-forest rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  );
};

export default DreamStage;
