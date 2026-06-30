import React from "react";
import { Container } from "../common/Container";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border-subtle bg-bg-primary/30 py-8 mt-auto w-full transition-colors">
      <Container size="lg" className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono text-text-muted">
        <div>
          © {new Date().getFullYear()} Ayush Shakya. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a
            href="https://github.com/AyShakya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors focus-ring-custom"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ayush-shakya"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors focus-ring-custom"
          >
            LinkedIn
          </a>
          <a
            href="https://leetcode.com/u/ayush_shakya/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-primary transition-colors focus-ring-custom"
          >
            LeetCode
          </a>
          <a
            href="mailto:ayushshakya.dev@gmail.com"
            className="hover:text-brand-primary transition-colors focus-ring-custom"
          >
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
};