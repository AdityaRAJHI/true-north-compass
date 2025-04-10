
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const discoveryQuestions = [
  "When was the last time you felt truly alive?",
  "What childhood dream have you forgotten about?",
  "If there were no pressure or expectations, what would you do every day?",
  "What activity makes you lose track of time?",
  "What legacy do you want to leave behind?",
  "What values are non-negotiable for you?",
  "Which accomplishment are you most proud of, and why?",
  "What would you do if you knew you couldn't fail?",
  "Who inspires you most, and what qualities do you admire in them?",
  "What does success truly mean to you?",
];

const Discover = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleNextQuestion = () => {
    if (answer.trim()) {
      setAnswers({ ...answers, [currentQuestion]: answer });
    }
    
    if (currentQuestion < discoveryQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAnswer("");
    } else {
      // Completed all questions
      navigate("/plan");
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswer(answers[currentQuestion - 1] || "");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-soul">
        <LoadingAnimation />
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / discoveryQuestions.length) * 100;

  return (
    <div className="min-h-screen pb-24 bg-gradient-soul">
      <div className="max-w-md mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-semibold text-foreground flex items-center">
              <Compass className="mr-2 h-6 w-6 text-soul-amber" />
              Soul Discovery
            </h1>
            <p className="text-muted-foreground">Question {currentQuestion + 1} of {discoveryQuestions.length}</p>
          </div>
        </motion.div>

        <div className="w-full h-2 bg-muted rounded-full mb-6 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-soul-amber rounded-full"
          />
        </div>

        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Card className="border-soul-peach/30 organic-shadow">
            <CardHeader className="pb-2">
              <h2 className="text-xl font-medium">{discoveryQuestions[currentQuestion]}</h2>
            </CardHeader>
            <CardContent>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Reflect honestly..."
                className="w-full p-4 rounded-xl border border-soul-peach/30 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-soul-amber/50 bg-white/80"
              />
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex justify-between">
          <Button
            onClick={handlePreviousQuestion}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-soul-peach/30 hover:bg-soul-peach/10 text-foreground"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            className="bg-soul-amber hover:bg-soul-amber/80 text-primary-foreground border-none"
          >
            {currentQuestion < discoveryQuestions.length - 1 ? "Next" : "Complete"}
          </Button>
        </div>
      </div>
      <Navigation />
    </div>
  );
};

export default Discover;
