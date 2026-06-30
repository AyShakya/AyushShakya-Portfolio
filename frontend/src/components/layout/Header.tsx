import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface NavTab {
  id: string;
  label: string;
  path: string;
}

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs: NavTab[] = [
    { id: "home", label: "Home", path: "/" },
    { id: "work", label: "Work", path: "/work" },
    { id: "brain", label: "Brain", path: "/brain" },
    { id: "about", label: "About", path: "/about" },
  ];

  const currentPath = location.pathname;
  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <header className="border-b border-slate-900/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="font-mono font-bold tracking-wider text-xs bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AYUSH.SHAKYA // HQ
          </span>
        </button>

        {/* Mobile Nav Details Dropdown */}
        <details className="md:hidden relative group">
          <summary className="list-none cursor-pointer p-2 select-none">
            <div className="space-y-1">
              <div className="h-0.5 w-5 bg-slate-400 rounded transition-transform group-open:rotate-45" />
              <div className="h-0.5 w-5 bg-slate-400 rounded group-open:opacity-0" />
              <div className="h-0.5 w-5 bg-slate-400 rounded group-open:-rotate-45" />
            </div>
          </summary>
          <nav className="absolute right-0 top-full mt-2 w-48 bg-slate-950 border border-slate-900 rounded-lg p-2 shadow-2xl flex flex-col space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  navigate(tab.path);
                  const details = document.querySelector("details");
                  if (details) details.open = false;
                }}
                className={`text-left w-full px-3 py-2 rounded-md transition-colors text-xs font-mono font-medium cursor-pointer ${
                  isActive(tab.path)
                    ? "bg-purple-500/10 text-purple-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-purple-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </details>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-xs font-mono font-medium">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => navigate(tab.path)}
              className={`transition-colors cursor-pointer ${
                isActive(tab.path)
                  ? "text-purple-400 font-semibold"
                  : "text-slate-400 hover:text-purple-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="hidden sm:flex items-center">
          <span className="text-[10px] font-mono text-slate-500 px-2 py-0.5 bg-slate-900 border border-slate-850 rounded">
            v2.0.0
          </span>
        </div>
      </div>
    </header>
  );
};