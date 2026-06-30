import React from "react";
import { getAboutContent } from "../utils/markdown";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

export const About: React.FC = () => {
  const about = getAboutContent();
  const meta = about.metadata;

  return (
    <div className="space-y-10 py-6 animate-fade-in max-w-3xl mx-auto">
      {/* Top Banner / Avatar & Summary */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-900">
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-white">{meta.name || "Ayush Shakya"}</h1>
          <p className="text-purple-400 font-mono text-xs md:text-sm">{meta.role || "Backend & Systems Engineer"}</p>
        </div>

        {meta.availability && (
          <span className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{meta.availability}</span>
          </span>
        )}
      </div>

      {/* Main Markdown Body */}
      <div className="prose prose-invert max-w-none">
        <MarkdownRenderer content={about.content} />
      </div>

      {/* Interactive Contact Card */}
      <section className="p-6 rounded-xl bg-gradient-to-r from-purple-950/10 to-indigo-950/10 border border-purple-500/10 space-y-4 mt-8">
        <h2 className="text-lg font-bold text-white">Let's Connect</h2>
        <p className="text-sm text-slate-400 leading-relaxed">
          I am always open to discussing new backend projects, architecture refactoring, or software engineering positions. Drop me a line or review my verified profiles below.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          {meta.email && (
            <a
              href={`mailto:${meta.email}`}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white rounded-lg text-xs font-mono transition-all duration-200"
            >
              ✉ Send Email
            </a>
          )}
          {meta.github && (
            <a
              href={meta.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-300 rounded-lg text-xs font-mono transition-all duration-200"
            >
              ⌨ GitHub
            </a>
          )}
          {meta.linkedin && (
            <a
              href={meta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-855 text-slate-300 rounded-lg text-xs font-mono transition-all duration-200"
            >
              💼 LinkedIn
            </a>
          )}
          {meta.leetcode && (
            <a
              href={meta.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-855 text-slate-300 rounded-lg text-xs font-mono transition-all duration-200"
            >
              🏆 LeetCode
            </a>
          )}
        </div>
      </section>
    </div>
  );
};