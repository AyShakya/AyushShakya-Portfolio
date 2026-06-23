import React from "react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const tabs = [
    { id: "home", label: "Home" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "journey", label: "Journey" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
          <span className="font-mono font-bold tracking-wider text-sm bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AYUSH.SHAKYA // HQ
          </span>
        </div>
        <nav className="flex space-x-6 md:space-x-8 text-sm font-medium">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`transition-colors cursor-pointer ${
                currentTab === tab.id
                  ? "text-purple-400 font-semibold"
                  : "text-slate-400 hover:text-purple-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="hidden sm:flex items-center space-x-3">
          <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-900 border border-slate-800 rounded">
            v1.0.0-beta
          </span>
        </div>
      </div>
    </header>
  );
};
