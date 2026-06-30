import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects } from "../utils/markdown";
import { getAllNotes } from "../utils/markdown";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const projects = getAllProjects().slice(0, 2); // Get featured/recent projects
  const notes = getAllNotes().slice(0, 2); // Get recent notes

  return (
    <div className="space-y-16 py-4 animate-fade-in">
      {/* Hero Section */}
      <section className="space-y-8 py-8 md:py-12">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span>Open to Full-Time Backend Roles</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Ayush Shakya
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
            Designing backend architectures, AI systems, and high-performance developer tools.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <button
            onClick={() => navigate("/work")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/10 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-sm"
          >
            Explore Proof-of-Work
          </button>
          <button
            onClick={() => navigate("/about")}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-sm"
          >
            Get in Touch
          </button>
        </div>
      </section>

      {/* Core Specialties Section */}
      <section className="py-6 border-t border-slate-900">
        <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase font-mono mb-6">
          Specialties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Backend Infrastructure", desc: "Scalable API design, distributed message brokers, caching architectures, and database optimizations." },
            { title: "Agentic AI Orchestration", desc: "State loops, tools integration, local LLM deployment pipelines, and autonomous workflows." },
            { title: "Systems Programming", desc: "WebAssembly optimization layers, process models, and low-latency system-level tooling." },
            { title: "DevOps & Isolation", desc: "Dockerized sandboxing, server provisioning, resource limits, and build optimization." },
          ].map((specialty, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-800/80 transition-all duration-300">
              <h3 className="text-base font-semibold text-white mb-2">{specialty.title}</h3>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{specialty.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Case Studies Section */}
      <section className="py-6 border-t border-slate-900">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase font-mono">
            Featured Case Studies
          </h2>
          <button
            onClick={() => navigate("/work")}
            className="text-xs text-purple-400 hover:text-purple-300 font-mono cursor-pointer"
          >
            All projects →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <button
              key={i}
              onClick={() => navigate(`/work?project=${project.metadata.id}`)}
              className="p-6 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/20 transition-all duration-300 text-left cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] text-purple-400 font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                    {project.metadata.tag}
                  </span>
                  {project.metadata.metrics && (
                    <span className="text-[10px] text-slate-500 font-mono">{project.metadata.metrics}</span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mt-4">{project.metadata.name}</h3>
                <p className="text-xs md:text-sm text-slate-400 mt-2 leading-relaxed line-clamp-2">
                  {project.metadata.name === "WatcherAgent" 
                    ? "An intelligent autonomous file watcher and builder agent designed to track modifications."
                    : "A production-grade reactive builder engine and compilation optimizer."}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-900 flex items-center justify-between text-xs text-purple-400 group">
                <span className="font-mono">Read Case Study</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Recent Notes Section */}
      <section className="py-6 border-t border-slate-900">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase font-mono">
            Recent Notes & Insights
          </h2>
          <button
            onClick={() => navigate("/brain")}
            className="text-xs text-purple-400 hover:text-purple-300 font-mono cursor-pointer"
          >
            Visit Brain →
          </button>
        </div>
        <div className="space-y-4">
          {notes.map((note, i) => (
            <button
              key={i}
              onClick={() => navigate(`/brain?note=${note.metadata.id}`)}
              className="w-full p-5 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/20 transition-all duration-300 text-left cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-mono">{note.metadata.category}</span>
                <h3 className="text-base font-bold text-white">{note.metadata.title}</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{note.metadata.snippet}</p>
              </div>
              <span className="text-[10px] text-slate-500 font-mono shrink-0 bg-slate-950 px-2 py-1 rounded border border-slate-900">
                {note.metadata.readTime}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Focus & Currently Exploring */}
      <section className="py-6 border-t border-slate-900">
        <h2 className="text-xs font-semibold tracking-wider text-slate-500 uppercase font-mono mb-6">
          Current Focus
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <h3 className="text-xs font-mono text-purple-400 mb-2">Building</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Agentic pipeline builders and high-throughput job runners.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/15 border border-slate-900">
            <h3 className="text-xs font-mono text-slate-400 mb-2">Learning</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Advanced Linux namespaces, network sockets, and Golang concurrency.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/15 border border-slate-900">
            <h3 className="text-xs font-mono text-slate-400 mb-2">Exploring</h3>
            <p className="text-xs text-slate-300 leading-relaxed">Embedded control loops for autonomous navigation systems.</p>
          </div>
        </div>
      </section>
    </div>
  );
};