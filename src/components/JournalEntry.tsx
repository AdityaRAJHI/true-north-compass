
import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface JournalEntryProps {
  id: string;
  title: string;
  content: string;
  date: Date;
  mood?: string;
  onClick: (id: string) => void;
}

const JournalEntry: React.FC<JournalEntryProps> = ({
  id,
  title,
  content,
  date,
  mood,
  onClick,
}) => {
  const formattedDate = formatDistanceToNow(date, { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="p-5 rounded-2xl bg-white border border-soul-peach/30 mb-4 cursor-pointer organic-shadow"
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-medium">{title}</h3>
        {mood && (
          <span className="text-muted-foreground text-sm bg-muted px-2 py-1 rounded-full">
            {mood}
          </span>
        )}
      </div>
      <p className="text-muted-foreground mb-3 line-clamp-2">{content}</p>
      <div className="flex items-center text-sm text-muted-foreground">
        <Calendar size={14} className="mr-1" />
        <span>{formattedDate}</span>
      </div>
    </motion.div>
  );
};

export default JournalEntry;
