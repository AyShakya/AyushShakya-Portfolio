import React from "react";
import { useNavigate } from "react-router-dom";

interface HomeProps {
}

export const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-8 py-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
          <span>✦ Active Dev Workspace</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Ayush Shakya
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl">
            Building backend systems, AI-powered applications, and production-ready products.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/projects")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            View Projects
          </button>
          <button
            onClick={() => navigate("/resume")}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            View Resume
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            Get In Touch
          </button>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="py-6 border-t border-slate-900">
        <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-6">
          What I Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { title: "Backend Engineering", desc: "Scalable APIs, distributed systems, and database architecture with Node.js, Express, and TypeScript." },
            { title: "Full Stack Development", desc: "End-to-end application development with React, real-time systems, and cloud-native deployments." },
            { title: "AI Systems", desc: "Agentic AI workflows, LLM integration, and autonomous reasoning pipelines." },
            { title: "Infrastructure & DevOps", desc: "Docker, Linux server management, CI/CD pipelines, and production monitoring." },
          ].map((domain, i) => (
            <div key={i} className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80 hover:border-slate-800 transition-all duration-300">
              <h3 className="text-lg font-semibold text-white mb-2">{domain.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{domain.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="py-6 border-t border-slate-900">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono">
            Featured Work
          </h2>
          <button
            onClick={() => navigate("/projects")}
            className="text-xs text-purple-400 hover:text-purple-300 font-mono cursor-pointer"
          >
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "WatcherAgent", tag: "Agentic AI", desc: "Autonomous file watcher and builder agent with recursive dependency tracking." },
            { name: "Catalyst", tag: "Systems", desc: "Production-grade reactive builder engine with WASM-accelerated chunk caching." },
            { name: "LiveDesk", tag: "Distributed", desc: "Real-time remote desktop infrastructure with Golang relay architecture." },
          ].map((project, i) => (
            <button
              key={i}
              onClick={() => navigate("/projects")}
              className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80 hover:border-slate-800 hover:bg-slate-900/50 transition-all duration-300 text-left cursor-pointer"
            >
              <span className="text-xs text-purple-400 font-mono px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                {project.tag}
              </span>
              <h3 className="text-lg font-semibold text-white mt-3">{project.name}</h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">{project.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Current Focus Section */}
      <section className="py-6 border-t border-slate-900">
        <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-6">
          Current Focus
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-purple-500/5 border border-purple-500/10">
            <h3 className="text-sm font-mono text-purple-400 mb-2">Currently Building</h3>
            <p className="text-sm text-slate-300">Production-ready agentic AI orchestration systems with autonomous file watchers and distributed message buses.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80">
            <h3 className="text-sm font-mono text-slate-400 mb-2">Currently Learning</h3>
            <p className="text-sm text-slate-300">Advanced Golang concurrency patterns, Kubernetes orchestration, and low-latency WebSocket architectures.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80">
            <h3 className="text-sm font-mono text-slate-400 mb-2">Currently Exploring</h3>
            <p className="text-sm text-slate-300">Cybersecurity fundamentals, Linux kernel namespaces, and embedded systems for drone navigation.</p>
          </div>
          <div className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80">
            <h3 className="text-sm font-mono text-slate-400 mb-2">Current Goal</h3>
            <p className="text-sm text-slate-300">Secure a backend engineering role focused on distributed systems, AI infrastructure, or production-grade platform development.</p>
          </div>
        </div>
      </section>

      {/* Trust bar / Core Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-t border-slate-900">
        {[
          { label: "DSA Solved", val: "500+" },
          { label: "LeetCode Rating", val: "1700+" },
          { label: "Featured Projects", val: "3" },
          { label: "CS Student", val: "Active" },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80 text-center">
            <p className="text-3xl font-extrabold text-white">{stat.val}</p>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Quick Navigation */}
      <section className="py-6 border-t border-slate-900">
        <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-6">
          Explore
        </h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Projects", path: "/projects" },
            { label: "Journey", path: "/journey" },
            { label: "Notes", path: "/notes" },
            { label: "Uses", path: "/uses" },
            { label: "About", path: "/about" },
            { label: "Resume", path: "/resume" },
          ].map((link, i) => (
            <button
              key={i}
              onClick={() => navigate(link.path)}
              className="px-4 py-2 text-sm font-mono text-slate-400 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-purple-500/30 hover:text-purple-300 transition-all duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};