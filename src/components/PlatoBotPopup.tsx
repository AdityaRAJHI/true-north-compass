
import React, { useState, useEffect, useRef } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import EarthAnimation from "@/components/EarthAnimation";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const reflectiveQuestions = [
  "What activities make you lose track of time?",
  "When do you feel most alive and energized?",
  "What did you love doing as a child that you've stopped doing?",
  "If you had unlimited resources, how would you spend your days?",
  "What are you naturally good at that others often compliment you on?",
  "What would you regret not trying or becoming if you looked back at the end of your life?",
  "What problems in the world deeply bother you that you wish you could solve?",
  "What fears are holding you back from pursuing what matters most?",
  "What would you do differently if no one would judge you?",
  "What values are non-negotiable in how you live and work?"
];

const PlatoBotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !isInitialized) {
      // Add intro message
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages([
            { 
              id: `intro-0`, 
              content: "Hello, I'm PlatoBot. Would you like to reflect on a thought-provoking question today?", 
              isUser: false 
            }
          ]);
          setIsInitialized(true);
        }, 1500);
      }, 500);
    }
  }, [isOpen, isInitialized]);

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const userMessage = {
      id: `user-${Date.now()}`,
      content: inputMessage,
      isUser: true
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    
    // Simulate bot response
    setTimeout(() => {
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        // Generate response or random question
        const botResponse = {
          id: `bot-${Date.now()}`,
          content: Math.random() > 0.5 
            ? `That's an interesting perspective. ${reflectiveQuestions[Math.floor(Math.random() * reflectiveQuestions.length)]}`
            : "I appreciate you sharing that. Tell me more about why you feel this way.",
          isUser: false
        };
        
        setMessages(prev => [...prev, botResponse]);
      }, 1500 + Math.random() * 1000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const askRandomQuestion = () => {
    const randomQuestion = reflectiveQuestions[Math.floor(Math.random() * reflectiveQuestions.length)];
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: `bot-question-${Date.now()}`, 
          content: randomQuestion, 
          isUser: false 
        }
      ]);
    }, 1500);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset chat after animation finishes
    setTimeout(() => {
      setMessages([]);
      setIsInitialized(false);
    }, 300);
  };

  const handleOpen = () => {
    setIsOpen(true);
    toast("PlatoBot is ready to chat with you", {
      description: "Ask a question or get a reflective prompt",
      duration: 3000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => open ? handleOpen() : handleClose()}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-24 right-6 z-50 rounded-full h-14 w-14 bg-soul-amber shadow-lg hover:bg-soul-amber/90 p-0"
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-primary-foreground" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md h-[70vh] p-0 bg-gradient-to-b from-white to-blue-50">
        <DialogHeader className="p-4 pb-0">
          <DialogTitle className="flex items-center text-2xl">
            <div className="mr-3">
              <EarthAnimation />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-foreground">PlatoBot</span>
              <span className="text-sm font-normal text-muted-foreground">Your philosophical companion</span>
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <ChatMessage
                  content={message.content}
                  isUser={message.isUser}
                />
              </motion.div>
            ))}
            {isTyping && <ChatMessage content="" isUser={false} isTyping={true} />}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {messages.length > 0 && messages.length < 4 && (
          <div className="px-4 pb-2">
            <Button
              variant="outline"
              onClick={askRandomQuestion}
              className="w-full border-soul-peach/30 bg-white/80 hover:bg-white text-foreground"
            >
              Ask me a reflective question
            </Button>
          </div>
        )}

        <div className="p-4 pt-2 border-t">
          <div className="flex items-center space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="bg-white/80 border-soul-peach/30 focus-visible:ring-soul-amber/30"
            />
            <Button
              onClick={handleSendMessage}
              disabled={inputMessage.trim() === ""}
              size="icon"
              className="bg-soul-amber hover:bg-soul-amber/80 text-primary-foreground"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PlatoBotPopup;
