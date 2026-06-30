import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ScrollProgressIndicator,
  NavigationBar,
  Logo,
  NavigationItem,
  MobileNavigation,
} from "../common/Navigation";

interface NavTab {
  id: string;
  label: string;
  path: string;
}

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs: NavTab[] = [
    { id: "home", label: "Home", path: "/" },
    { id: "work", label: "Work", path: "/work" },
    { id: "brain", label: "Brain", path: "/brain" },
    { id: "about", label: "About", path: "/about" },
  ];

  const currentPath = location.pathname;
  const isTabActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <>
      <ScrollProgressIndicator />
      <NavigationBar>
        <Logo onClick={() => setIsMobileMenuOpen(false)} />

        <div className="flex items-center gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            {tabs.map((tab) => (
              <NavigationItem
                key={tab.id}
                label={tab.label}
                path={tab.path}
                isActive={isTabActive(tab.path)}
                onClick={() => navigate(tab.path)}
              />
            ))}
          </nav>

          {/* Mobile Navigation */}
          <MobileNavigation
            isOpen={isMobileMenuOpen}
            tabs={tabs}
            currentPath={currentPath}
            onNavigate={(path) => navigate(path)}
            onClose={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />

          {/* Version Tag */}
          <div className="hidden sm:flex items-center">
            <span className="text-[10px] font-mono text-text-muted px-2 py-0.5 bg-bg-secondary border border-border-subtle rounded select-none">
              v2.0.0
            </span>
          </div>
        </div>
      </NavigationBar>
    </>
  );
};