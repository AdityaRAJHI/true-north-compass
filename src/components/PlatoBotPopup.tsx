
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

// Soul-searching questions focused on discovering purpose
const soulQuestions = [
  "What activities make you feel most alive and present?",
  "If money and time were no object, what would you dedicate your life to?",
  "What did you love doing as a child that you've lost touch with?",
  "What problem in the world deeply bothers you that you wish you could solve?",
  "When do you experience 'flow state' where time seems to disappear?",
  "What would you regret not doing or becoming when looking back at your life?",
  "What unique strengths or talents do others recognize in you?",
  "What cause or purpose feels bigger than yourself?",
  "What would your ideal day look like if you were living your purpose?",
  "What fear is holding you back from pursuing what matters most to you?"
];

// Goal clarity questions to help define the ultimate goal
const goalQuestions = [
  "Can you describe your ultimate goal or purpose in a single sentence?",
  "Why is this goal meaningful to you personally?",
  "How would achieving this goal transform your life?",
  "What small step could you take today toward this goal?",
  "What obstacles do you anticipate, and how might you overcome them?",
  "Who could support you on this journey?",
  "How will you know when you've succeeded?",
  "What skills or knowledge will you need to develop?"
];

const PlatoBotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasDefinedGoal, setHasDefinedGoal] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questionType, setQuestionType] = useState<'intro' | 'soul' | 'goal'>('intro');
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
              content: "Hello, I'm PlatoBot. I'm here to help you discover your true purpose and ultimate goal in life. Would you like to explore some soul-searching questions to help clarify your path?", 
              isUser: false 
            }
          ]);
          setIsInitialized(true);
          setQuestionType('intro');
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
    
    // Check for goal definition in intro phase
    if (questionType === 'intro') {
      const lowerCaseMessage = inputMessage.toLowerCase();
      const affirmativeResponses = ['yes', 'yeah', 'sure', 'okay', 'ok', 'yep', 'y', 'definitely', 'absolutely'];
      const negativeResponses = ['no', 'nope', 'n', 'not', 'don\'t', 'dont'];
      
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          
          if (affirmativeResponses.some(resp => lowerCaseMessage.includes(resp))) {
            // User agreed to explore soul questions
            setMessages(prev => [
              ...prev, 
              {
                id: `bot-goal-${Date.now()}`,
                content: "Great! First, can you tell me what you believe your ultimate goal or purpose in life might be? Don't worry if you're not sure yet, we'll explore together.",
                isUser: false
              }
            ]);
            setQuestionType('goal');
          } else if (negativeResponses.some(resp => lowerCaseMessage.includes(resp))) {
            // User declined soul questions
            setMessages(prev => [
              ...prev, 
              {
                id: `bot-decline-${Date.now()}`,
                content: "That's okay. I'm here whenever you're ready to explore deeper questions about your path. Feel free to ask me anything else in the meantime.",
                isUser: false
              }
            ]);
          } else {
            // Unclear response, assume they want to continue
            setMessages(prev => [
              ...prev, 
              {
                id: `bot-goal-${Date.now()}`,
                content: "Let's start by exploring what might be your ultimate goal or purpose. Do you have an idea of what that might be for you?",
                isUser: false
              }
            ]);
            setQuestionType('goal');
          }
        }, 1500);
      }, 500);
    } 
    // User responded to goal definition request
    else if (questionType === 'goal') {
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          
          // Check if the response seems like a clear goal statement
          const hasDefinedGoalInMsg = inputMessage.length > 15 && !inputMessage.includes('?') && !inputMessage.toLowerCase().includes('not sure') && !inputMessage.toLowerCase().includes('i don\'t know');
          
          if (hasDefinedGoalInMsg) {
            setHasDefinedGoal(true);
            setMessages(prev => [
              ...prev, 
              {
                id: `bot-goal-defined-${Date.now()}`,
                content: `That's a meaningful goal. Let's explore it deeper to make sure it truly resonates with your authentic self. ${goalQuestions[currentQuestion]}`,
                isUser: false
              }
            ]);
            setCurrentQuestion(prev => (prev + 1) % goalQuestions.length);
          } else {
            // User seems uncertain about their goal
            setMessages(prev => [
              ...prev, 
              {
                id: `bot-soul-question-${Date.now()}`,
                content: `It's completely normal to be uncertain about your purpose. Let's explore some deeper questions to help you discover it. ${soulQuestions[currentQuestion]}`,
                isUser: false
              }
            ]);
            setQuestionType('soul');
            setCurrentQuestion(prev => (prev + 1) % soulQuestions.length);
          }
        }, 1500);
      }, 500);
    }
    // Handle soul question responses
    else if (questionType === 'soul') {
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          
          // After 3 soul questions, check if they're ready to define a goal
          if (currentQuestion > 2 && Math.random() > 0.5) {
            setMessages(prev => [
              ...prev, 
              {
                id: `bot-goal-prompt-${Date.now()}`,
                content: "Based on your reflections, do you feel ready to articulate your ultimate goal or purpose? What might it be?",
                isUser: false
              }
            ]);
            setQuestionType('goal');
          } else {
            // Continue with soul questions
            setMessages(prev => [
              ...prev, 
              {
                id: `bot-soul-question-${Date.now()}`,
                content: `Thank you for sharing. Let's explore another dimension. ${soulQuestions[currentQuestion]}`,
                isUser: false
              }
            ]);
            setCurrentQuestion(prev => (prev + 1) % soulQuestions.length);
          }
        }, 1500);
      }, 500);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const askRandomQuestion = () => {
    const question = hasDefinedGoal ? 
      goalQuestions[Math.floor(Math.random() * goalQuestions.length)] : 
      soulQuestions[Math.floor(Math.random() * soulQuestions.length)];
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: `bot-question-${Date.now()}`, 
          content: question, 
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
      setHasDefinedGoal(false);
      setCurrentQuestion(0);
      setQuestionType('intro');
    }, 300);
  };

  const handleOpen = () => {
    setIsOpen(true);
    toast("PlatoBot is ready to help you find your purpose", {
      description: "Explore soul-searching questions to discover your path",
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
              {hasDefinedGoal ? "Explore my goal deeper" : "Ask me a soul question"}
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
