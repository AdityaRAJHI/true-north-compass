
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
}

const introMessages = [
  "Hello, I'm PlatoBot. I'm here to help you find your true north through meaningful reflection.",
  "Our conversations are designed to help you explore your values, dreams, and authentic purpose.",
  "What's on your mind today? Or would you like me to ask you a thought-provoking question to get started?"
];

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

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Add intro messages with typing effect
      let delay = 500;
      introMessages.forEach((msg, index) => {
        setTimeout(() => {
          setIsTyping(true);
          
          setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [
              ...prev, 
              { id: `intro-${index}`, content: msg, isUser: false }
            ]);
          }, 1500);
        }, delay);
        
        delay += 2500;
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-soul">
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 bg-gradient-soul">
      <div className="max-w-md mx-auto p-6 h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-6"
        >
          <div>
            <h1 className="text-3xl font-semibold text-foreground flex items-center">
              <MessageCircle className="mr-2 h-6 w-6 text-soul-amber" />
              PlatoBot
            </h1>
            <p className="text-muted-foreground">Your philosophical companion</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 overflow-y-auto mb-4 pr-2"
        >
          <div className="space-y-2">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                content={message.content}
                isUser={message.isUser}
              />
            ))}
            {isTyping && <ChatMessage content="" isUser={false} isTyping={true} />}
            <div ref={messagesEndRef} />
          </div>
        </motion.div>

        {messages.length > 0 && messages.length < 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <Button
              variant="outline"
              onClick={askRandomQuestion}
              className="w-full border-soul-peach/30 bg-white/80 hover:bg-white text-foreground"
            >
              Ask me a reflective question
            </Button>
          </motion.div>
        )}

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
            className="bg-soul-amber hover:bg-soul-amber/80 text-primary-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Chat;
