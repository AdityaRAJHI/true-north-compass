
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuoteCardProps {
  quote: string;
  author: string;
  className?: string;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, author, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={cn(
        "p-6 md:p-8 rounded-2xl bg-white/90 border border-soul-peach/30 organic-shadow",
        className
      )}
    >
      <p className="text-lg md:text-xl text-foreground/80 italic mb-4 leading-relaxed">
        "{quote}"
      </p>
      <p className="text-sm text-muted-foreground text-right">— {author}</p>
    </motion.div>
  );
};

export default QuoteCard;
