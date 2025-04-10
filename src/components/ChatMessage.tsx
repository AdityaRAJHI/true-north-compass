
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  content: string;
  isUser?: boolean;
  isTyping?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isUser = false,
  isTyping = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "mb-4 max-w-[85%] rounded-2xl p-4",
        isUser
          ? "ml-auto bg-soul-amber/90 text-primary-foreground"
          : "mr-auto bg-white border border-soul-peach/30"
      )}
    >
      {isTyping ? (
        <div className="flex space-x-2 h-6 items-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={cn(
                "w-2 h-2 rounded-full",
                isUser ? "bg-primary-foreground" : "bg-soul-amber"
              )}
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      ) : (
        <p className="whitespace-pre-line">{content}</p>
      )}
    </motion.div>
  );
};

export default ChatMessage;
