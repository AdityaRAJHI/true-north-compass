
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { List, Plus } from "lucide-react";
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import DreamStage from "@/components/DreamStage";
import Task from "@/components/Task";
import { Button } from "@/components/ui/button";

interface StageType {
  id: string;
  title: string;
  description: string;
  timeframe: string;
  progress: number;
  tasks: {
    id: string;
    title: string;
    isCompleted: boolean;
  }[];
}

const initialStages: StageType[] = [
  {
    id: "1",
    title: "Learning",
    description: "Gather knowledge and build foundations",
    timeframe: "2-3 months",
    progress: 65,
    tasks: [
      { id: "1-1", title: "Research successful examples", isCompleted: true },
      { id: "1-2", title: "Take online course on basics", isCompleted: true },
      { id: "1-3", title: "Read 3 books on the subject", isCompleted: false },
      { id: "1-4", title: "Join a community of practitioners", isCompleted: false },
    ],
  },
  {
    id: "2",
    title: "Building",
    description: "Create your first prototypes and gather feedback",
    timeframe: "3-4 months",
    progress: 0,
    tasks: [
      { id: "2-1", title: "Create project plan", isCompleted: false },
      { id: "2-2", title: "Build minimum viable product", isCompleted: false },
      { id: "2-3", title: "Get feedback from 5 people", isCompleted: false },
      { id: "2-4", title: "Refine based on feedback", isCompleted: false },
    ],
  },
  {
    id: "3",
    title: "Sharing",
    description: "Bring your work to a wider audience",
    timeframe: "Ongoing",
    progress: 0,
    tasks: [
      { id: "3-1", title: "Create presentation of your work", isCompleted: false },
      { id: "3-2", title: "Share with your community", isCompleted: false },
      { id: "3-3", title: "Teach someone what you've learned", isCompleted: false },
      { id: "3-4", title: "Plan next evolution of your project", isCompleted: false },
    ],
  },
];

const Plan = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stages, setStages] = useState<StageType[]>(initialStages);
  const [activeStageId, setActiveStageId] = useState("1");

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleStageClick = (stageId: string) => {
    setActiveStageId(stageId);
  };

  const activeStage = stages.find(stage => stage.id === activeStageId);

  const handleTaskToggle = (taskId: string) => {
    setStages(stages.map(stage => {
      if (stage.id === activeStageId) {
        const updatedTasks = stage.tasks.map(task => 
          task.id === taskId 
            ? { ...task, isCompleted: !task.isCompleted } 
            : task
        );
        
        // Calculate new progress
        const completedCount = updatedTasks.filter(t => t.isCompleted).length;
        const progress = Math.round((completedCount / updatedTasks.length) * 100);
        
        return {
          ...stage,
          tasks: updatedTasks,
          progress
        };
      }
      return stage;
    }));
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
      <div className="max-w-md mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-semibold text-foreground flex items-center">
              <List className="mr-2 h-6 w-6 text-soul-amber" />
              Dream Plan
            </h1>
            <p className="text-muted-foreground">Your journey map</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-xl font-medium mb-4">Journey Stages</h2>
          {stages.map((stage) => (
            <DreamStage
              key={stage.id}
              title={stage.title}
              description={stage.description}
              timeframe={stage.timeframe}
              isActive={stage.id === activeStageId}
              progress={stage.progress}
              onClick={() => handleStageClick(stage.id)}
            />
          ))}
          <Button
            variant="outline"
            className="w-full py-6 border-dashed border-soul-peach/40 bg-white/50 hover:bg-white/80 mt-2 text-muted-foreground"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Stage
          </Button>
        </motion.div>

        {activeStage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">{activeStage.title} Tasks</h2>
              <span className="text-sm bg-soul-cream px-3 py-1 rounded-full text-foreground">
                {activeStage.progress}% complete
              </span>
            </div>
            
            {activeStage.tasks.map(task => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                isCompleted={task.isCompleted}
                onClick={handleTaskToggle}
              />
            ))}
            
            <Button
              variant="outline"
              className="w-full py-5 border-dashed border-soul-peach/40 bg-white/50 hover:bg-white/80 mt-2 text-muted-foreground"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Task
            </Button>
          </motion.div>
        )}
      </div>
      <Navigation />
    </div>
  );
};

export default Plan;
