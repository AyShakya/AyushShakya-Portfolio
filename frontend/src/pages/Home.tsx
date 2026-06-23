import React from "react";
import type { HealthStatus } from "../api";

interface HomeProps {
  health: HealthStatus | null;
  loading: boolean;
  onNavigate: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ health, loading, onNavigate }) => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="space-y-8 py-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
          <span>✨ Active Dev Workspace</span>
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
            onClick={() => onNavigate("projects")}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
          >
            View Projects
          </button>
          <a
            href="mailto:contact@example.com"
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5 text-center"
          >
            Get In Touch
          </a>
        </div>
      </section>

      {/* Connection status section */}
      <section className="py-6 border-t border-slate-900">
        <h2 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-4">
          System Integration Status
        </h2>
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur flex items-center space-x-4 max-w-lg">
          <div className={`p-2 rounded-lg ${
            loading ? "bg-amber-500/10 text-amber-400" :
            health?.status === "ok" ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
          }`}>
            <div className={`h-2 w-2 rounded-full ${
              loading ? "bg-amber-400 animate-ping" :
              health?.status === "ok" ? "bg-emerald-400 animate-pulse" : "bg-rose-400"
            }`} />
          </div>
          <div>
            <p className="text-sm font-mono font-semibold">
              {loading ? "Checking Backend Service..." :
               health?.status === "ok" ? "Express Server Online" : "Express Server Offline"}
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              {loading ? "Attempting connection to Express service..." :
               health?.status === "ok" ? `${health.message} (checked at ${new Date(health.timestamp || '').toLocaleTimeString()})` : "Please run 'npm run dev' inside backend/"}
            </p>
          </div>
        </div>
      </section>

      {/* Trust bar / Core Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-10 border-t border-slate-900">
        {[
          { label: "DSA Solved", val: "500+" },
          { label: "LeetCode Rating", val: "1700+" },
          { label: "Featured Projects", val: "3" },
          { label: "CS Student Status", val: "Active" },
        ].map((stat, i) => (
          <div key={i} className="p-5 rounded-xl bg-slate-900/30 border border-slate-900/80 text-center">
            <p className="text-3xl font-extrabold text-white">{stat.val}</p>
            <p className="text-xs text-slate-500 font-mono mt-1 uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </section>
    </div>
  );
};
