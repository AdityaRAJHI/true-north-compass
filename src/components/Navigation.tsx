
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, MoreHorizontal, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const location = useLocation();
  
  const mainNavigationItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/discover", icon: Compass, label: "Discover" },
  ];

  const dropdownNavigationItems = [
    { path: "/plan", label: "Dream Plan" },
    { path: "/journal", label: "Journal" },
    { path: "/chat", label: "PlatoBot" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 pb-2 sm:pb-4 px-4">
      <nav className="flex justify-center">
        <div className="bg-white/80 backdrop-blur-md rounded-full p-1 border border-soul-peach/30 organic-shadow flex items-center">
          {mainNavigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative px-4 py-2 rounded-full flex flex-col items-center transition-all duration-300",
                  isActive ? "text-soul-amber" : "text-muted-foreground hover:text-soul-amber/70"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navigation-pill"
                    className="absolute inset-0 bg-soul-cream rounded-full z-0"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">
                  <item.icon size={20} />
                </span>
                <span className="text-xs mt-1 relative z-10">{item.label}</span>
              </Link>
            );
          })}
          
          <DropdownMenu>
            <DropdownMenuTrigger className="relative px-4 py-2 rounded-full flex flex-col items-center transition-all duration-300 text-muted-foreground hover:text-soul-amber/70">
              <span className="relative z-10">
                <MoreHorizontal size={20} />
              </span>
              <span className="text-xs mt-1 relative z-10">More</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-md border border-soul-peach/30">
              {dropdownNavigationItems.map((item) => (
                <DropdownMenuItem key={item.path} asChild>
                  <Link to={item.path} className="cursor-pointer">
                    {item.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
