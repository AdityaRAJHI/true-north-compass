
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Book, Plus, Search } from "lucide-react";
import Navigation from "@/components/Navigation";
import LoadingAnimation from "@/components/LoadingAnimation";
import JournalEntry from "@/components/JournalEntry";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const sampleEntries = [
  {
    id: "1",
    title: "New beginnings",
    content: "Today I took the first step on my journey. I'm feeling a mix of excitement and nervousness, but I know this is the right path for me. I'm committing to spending at least 30 minutes every day working towards my dream.",
    date: new Date(2025, 3, 8),
    mood: "Excited"
  },
  {
    id: "2",
    title: "Overcoming doubts",
    content: "Had a moment of doubt today about whether I'm capable of achieving what I've set out to do. After some reflection, I realized that this doubt is normal and even necessary part of growth. Pushed through and made progress anyway.",
    date: new Date(2025, 3, 9),
    mood: "Reflective"
  },
  {
    id: "3",
    title: "Small wins matter",
    content: "Celebrated a small win today! Completed my first milestone ahead of schedule. It's important to acknowledge these moments - they're the building blocks of greater achievements. Feeling motivated to keep going.",
    date: new Date(2025, 3, 10),
    mood: "Proud"
  },
];

const Journal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [entries, setEntries] = useState(sampleEntries);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleEntryClick = (id: string) => {
    setSelectedEntry(id);
  };

  const filteredEntries = entries.filter(entry => 
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.mood?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Book className="mr-2 h-6 w-6 text-soul-amber" />
              Path Journal
            </h1>
            <p className="text-muted-foreground">Your journey reflections</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 border-soul-peach/30 bg-white/80"
            />
          </div>

          <Button
            className="w-full mb-6 bg-soul-amber hover:bg-soul-amber/80 text-primary-foreground border-none"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Journal Entry
          </Button>

          {filteredEntries.length > 0 ? (
            filteredEntries.map(entry => (
              <JournalEntry
                key={entry.id}
                id={entry.id}
                title={entry.title}
                content={entry.content}
                date={entry.date}
                mood={entry.mood}
                onClick={handleEntryClick}
              />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No entries found</p>
            </div>
          )}
        </motion.div>
      </div>
      <Navigation />
    </div>
  );
};

export default Journal;
