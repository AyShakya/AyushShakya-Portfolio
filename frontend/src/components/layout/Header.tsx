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
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "experience", label: "Experience", path: "/experience" },
    { id: "journey", label: "Journey", path: "/journey" },
    { id: "notes", label: "Notes", path: "/notes" },
    { id: "about", label: "About", path: "/about" },
    { id: "contact", label: "Contact", path: "/contact" },
  ];

  const currentPath = location.pathname;
  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="h-3 w-3 rounded-full bg-purple-500 animate-pulse" />
          <span className="font-mono font-bold tracking-wider text-sm bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            AYUSH.SHAKYA // HQ
          </span>
        </button>

        {/* Mobile Hamburger */}
        <details className="md:hidden">
          <summary className="list-none cursor-pointer p-2">
            <div className="space-y-1">
              <div className="h-0.5 w-5 bg-slate-400 rounded" />
              <div className="h-0.5 w-5 bg-slate-400 rounded" />
              <div className="h-0.5 w-5 bg-slate-400 rounded" />
            </div>
          </summary>
          <nav className="absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex flex-col space-y-3">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  navigate(tab.path);
                  // Close the details element
                  const details = document.querySelector("details");
                  if (details) details.open = false;
                }}
                className={`text-left transition-colors cursor-pointer text-sm font-medium ${
                  isActive(tab.path)
                    ? "text-purple-400 font-semibold"
                    : "text-slate-400 hover:text-purple-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </details>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 md:space-x-8 text-sm font-medium">
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

        <div className="hidden sm:flex items-center space-x-3">
          <span className="text-xs font-mono text-slate-500 px-2 py-1 bg-slate-900 border border-slate-800 rounded">
            v1.0.0-beta
          </span>
        </div>
      </div>
    </header>
  );
};