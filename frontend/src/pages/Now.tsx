import React from "react";

export const Now: React.FC = () => {
  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Now</h1>
        <p className="text-slate-400 font-light">
          What I'm focused on right now. Updated occasionally.
        </p>
      </div>

      <section className="space-y-4">
        {[
          {
            label: "Currently Building",
            content: "Production-ready agentic AI orchestration systems with autonomous file watchers, recursive dependency tracking, and distributed message buses. Building WatcherAgent for automated dev workflows.",
            color: "purple",
          },
          {
            label: "Currently Learning",
            content: "Advanced Golang concurrency patterns (goroutines, channels, select), Kubernetes pod orchestration, and low-latency WebSocket architectures for real-time collaborative systems.",
            color: "blue",
          },
          {
            label: "Currently Exploring",
            content: "Cybersecurity fundamentals (network scanning, vulnerability assessment), Linux kernel namespaces and cgroups, and embedded systems programming for drone navigation.",
            color: "emerald",
          },
          {
            label: "Current Goal",
            content: "Secure a backend engineering role focused on distributed systems, AI infrastructure, or production-grade platform development where I can architect scalable solutions.",
            color: "amber",
          },
          {
            label: "Current Challenge",
            content: "Optimizing WebSocket-based real-time systems for sub-10ms latency while maintaining connection stability under high concurrency loads.",
            color: "rose",
          },
          {
            label: "Current Obsession",
            content: "Understanding how modern AI agents reason through multi-step problems — studying chain-of-thought prompting, tool-use patterns, and memory architectures.",
            color: "indigo",
          },
        ].map((item, i) => {
          const colorClasses: Record<string, { text: string; hover: string }> = {
            purple: { text: "text-purple-400", hover: "hover:border-purple-500/20" },
            blue: { text: "text-blue-400", hover: "hover:border-blue-500/20" },
            emerald: { text: "text-emerald-400", hover: "hover:border-emerald-500/20" },
            amber: { text: "text-amber-400", hover: "hover:border-amber-500/20" },
            rose: { text: "text-rose-400", hover: "hover:border-rose-500/20" },
            indigo: { text: "text-indigo-400", hover: "hover:border-indigo-500/20" },
          };
          const colors = colorClasses[item.color] || { text: "text-slate-400", hover: "hover:border-slate-500/20" };

          return (
            <div
              key={i}
              className={`p-5 rounded-xl bg-slate-900/30 border border-slate-900/80 ${colors.hover} transition-all duration-300`}
            >
              <h2 className={`text-sm font-mono font-bold ${colors.text} mb-2`}>
                {item.label}
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">{item.content}</p>
            </div>
          );
        })}
      </section>

      <p className="text-xs text-slate-500 font-mono border-t border-slate-900 pt-6">
        Last updated: Q2 2026 · This page reflects my current focus areas.
      </p>
    </div>
  );
};