
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Star, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Task from "@/components/Task";
import QuoteCard from "@/components/QuoteCard";
import LoadingAnimation from "@/components/LoadingAnimation";
import Navigation from "@/components/Navigation";

type Task = {
  id: string;
  title: string;
  isCompleted: boolean;
};

const quotes = [
  {
    quote: "The most difficult thing is the decision to act, the rest is merely tenacity.",
    author: "Amelia Earhart"
  },
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu"
  },
  {
    quote: "Follow your bliss and the universe will open doors where there were only walls.",
    author: "Joseph Campbell"
  },
  {
    quote: "The purpose of life is a life of purpose.",
    author: "Robert Byrne"
  },
  {
    quote: "The two most important days in your life are the day you are born and the day you find out why.",
    author: "Mark Twain"
  }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dailyQuote, setDailyQuote] = useState<typeof quotes[0]>(quotes[0]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Complete morning reflection", isCompleted: false },
    { id: "2", title: "Read about your next milestone", isCompleted: false },
    { id: "3", title: "Meditate for 10 minutes", isCompleted: false },
    { id: "4", title: "Journal today's experience", isCompleted: false },
  ]);
  const [streak, setStreak] = useState(3);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Set random quote
      setDailyQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleTaskToggle = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, isCompleted: !task.isCompleted } 
        : task
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-soul">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-semibold mb-2 text-soul-amber">SoulPath</h1>
          <p className="text-muted-foreground">Find your true north</p>
        </motion.div>
        <LoadingAnimation />
      </div>
    );
  }

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
            <h1 className="text-3xl font-semibold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground">Your soul journey continues</p>
          </div>
          <div className="flex items-center bg-white/80 px-3 py-2 rounded-full border border-soul-peach/30">
            <Star className="text-soul-amber h-4 w-4 mr-1" />
            <span className="text-sm font-medium">{streak} day streak</span>
          </div>
        </motion.div>

        <QuoteCard 
          quote={dailyQuote.quote} 
          author={dailyQuote.author} 
          className="mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-medium">Today's Path</h2>
            <span className="text-sm text-muted-foreground flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date().toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
              })}
            </span>
          </div>

          <div className="mb-6">
            {tasks.map(task => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isCompleted={task.isCompleted}
                onClick={handleTaskToggle}
              />
            ))}
          </div>

          <div className="space-y-4">
            <Link to="/discover">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl bg-white border border-soul-peach/30 flex justify-between items-center organic-shadow"
              >
                <div>
                  <h3 className="font-medium">Continue Soul Discovery</h3>
                  <p className="text-sm text-muted-foreground">Uncover more of your true purpose</p>
                </div>
                <ChevronRight className="text-soul-amber" />
              </motion.div>
            </Link>
            
            <Link to="/plan">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl bg-white border border-soul-peach/30 flex justify-between items-center organic-shadow"
              >
                <div>
                  <h3 className="font-medium">Dream Plan</h3>
                  <p className="text-sm text-muted-foreground">View your journey stages</p>
                </div>
                <ChevronRight className="text-soul-amber" />
              </motion.div>
            </Link>
            
            <Link to="/journal">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-2xl bg-white border border-soul-peach/30 flex justify-between items-center organic-shadow"
              >
                <div>
                  <h3 className="font-medium">Path Journal</h3>
                  <p className="text-sm text-muted-foreground">Reflect on your journey</p>
                </div>
                <ChevronRight className="text-soul-amber" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
      <Navigation />
    </div>
  );
};

export default Index;
