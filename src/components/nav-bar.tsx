"use client";
import { Home, Search, BarChart3, Bell, Settings } from "lucide-react";
import { useState } from "react";

interface HomeNavigationProps {
  onLearnClick: () => void;
}

export function HomeNavigation({ onLearnClick }: HomeNavigationProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    {
      icon: Home,
      label: "Home",
    },
    {
      icon: Search,
      label: "Search",
    },
    {
      icon: BarChart3,
      label: "Sales Analytics",
    },
    {
      icon: Bell,
      label: "Notification",
    },
    {
      icon: Settings,
      label: "Account Settings",
    },
  ];


  return (
    <div className="fixed top-4 left-4 right-4 z-40">
      <div className="flex justify-between items-center">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center gap-2 px-4 py-2 rounded-xl">
          <span className="text-2xl">🧬</span>
          <span className="text-white font-bold text-lg">StemXio</span>
        </div>

        {/* Navigation */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl p-2 rounded-2xl">
          <nav className="flex items-center gap-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out cursor-pointer hover:bg-teal-500/20 hover:border-teal-400/60 active:scale-[0.98] ${
                    activeIndex === index 
                      ? "border-2 border-teal-400 shadow-[inset_0_0_10px_#2dd4bf40]" 
                      : "border-2 border-transparent"
                  }`}
                  onClick={() => setActiveIndex(index)}
                >
                  <Icon className="w-5 h-5 text-white transition-transform duration-200 hover:scale-110" />
                  <span className="text-white font-medium text-sm">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
