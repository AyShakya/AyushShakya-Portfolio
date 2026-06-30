import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// --- ScrollProgressIndicator ---
export const ScrollProgressIndicator: React.FC = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setProgress(window.scrollY / totalScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[1px] bg-border-subtle z-100 pointer-events-none">
      <div
        className="h-full bg-brand-primary transition-all duration-75 ease-out"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
};

// --- Logo ---
interface LogoProps {
  onClick?: () => void;
  statusLabel?: string;
}

export const Logo: React.FC<LogoProps> = ({ onClick, statusLabel = "Open to Roles" }) => {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="inline-flex items-center space-x-3 focus-ring-custom py-1 select-none"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary/60 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
      </span>
      <span className="font-mono font-bold tracking-wider text-xs text-text-primary uppercase hover:opacity-80 transition-opacity">
        AYUSH.SHAKYA // HQ
      </span>
      {statusLabel && (
        <span className="hidden sm:inline-flex items-center text-[9px] font-mono text-text-muted border border-border-subtle px-1.5 py-0.5 rounded bg-bg-secondary/30 select-none">
          {statusLabel}
        </span>
      )}
    </Link>
  );
};

// --- NavigationItem ---
interface NavigationItemProps {
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`relative px-1 py-1 font-mono text-xs font-medium cursor-pointer transition-colors focus-ring-custom ${
        isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
      }`}
    >
      <span className="relative z-10">{label}</span>
      {isActive && (
        <motion.span
          layoutId="nav-indicator"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
          className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-primary"
        />
      )}
    </button>
  );
};

// --- NavigationBar ---
interface NavigationBarProps {
  children: React.ReactNode;
}

export const NavigationBar: React.FC<NavigationBarProps> = ({ children }) => {
  return (
    <header className="border-b border-border-subtle bg-bg-primary/75 backdrop-blur-md sticky top-0 w-full z-50 transition-colors">
      <div className="container-wide py-4 flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};

// --- MobileNavigation ---
interface MobileNavigationProps {
  isOpen: boolean;
  tabs: { id: string; label: string; path: string }[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  isOpen,
  tabs,
  currentPath,
  onNavigate,
  onClose,
}) => {
  const isTabActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="md:hidden list-none cursor-pointer p-2 select-none focus-ring-custom rounded-md hover:bg-bg-secondary/40"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <div className="space-y-1.5 flex flex-col items-center justify-center h-4 w-5">
          <span
            className={`h-0.5 w-5 bg-text-secondary rounded transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-text-secondary rounded transition-opacity duration-200 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-text-secondary rounded transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </div>
      </button>

      {/* Dropdown Menu block */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Modal barrier */}
            <div className="fixed inset-0 top-[53px] bg-black/60 backdrop-blur-xs z-40 md:hidden" onClick={onClose} />
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 top-full mt-3 w-48 bg-bg-secondary border border-border-strong rounded-lg p-2 shadow-floating flex flex-col space-y-1 z-50 md:hidden"
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    onNavigate(tab.path);
                    onClose();
                  }}
                  className={`text-left w-full px-4 py-2.5 rounded-md transition-colors text-xs font-mono font-medium cursor-pointer ${
                    isTabActive(tab.path)
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-text-secondary hover:bg-bg-primary hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
