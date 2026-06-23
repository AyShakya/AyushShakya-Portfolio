import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-900 bg-slate-950/30">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} Ayush Shakya. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
            LinkedIn
          </a>
          <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">
            LeetCode
          </a>
        </div>
      </div>
    </footer>
  );
};
