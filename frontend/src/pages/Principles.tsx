import React from "react";

export const Principles: React.FC = () => {
  const principles = [
    {
      title: "Learn by Building",
      desc: "Theory is a map, but code is the territory. The deepest understanding comes from implementing, breaking, and fixing real systems.",
    },
    {
      title: "Understand Internals",
      desc: "Don't just use tools — understand how they work under the hood. Knowing the internals of your database, runtime, or framework makes you unstoppable at debugging and optimization.",
    },
    {
      title: "Long-Term Skill > Short-Term Hacks",
      desc: "Choose technologies and practices that compound. A deep understanding of fundamentals outlasts any framework's popularity.",
    },
    {
      title: "Execution Beats Consumption",
      desc: "Reading 100 tutorials is worth less than building one thing that works. Ship code, break things, iterate fast.",
    },
    {
      title: "Systems Over Isolated Knowledge",
      desc: "Don't learn facts in isolation. Build mental models that connect concepts across layers — from kernel syscalls to HTTP responses.",
    },
    {
      title: "Write Code for Humans First",
      desc: "Code is communication. Clear naming, thoughtful structure, and concise logic matter more than clever one-liners.",
    },
    {
      title: "Test Your Understanding by Teaching",
      desc: "If you can't explain it clearly, you don't understand it well enough. Documentation, notes, and mentoring are forced-marches to deeper understanding.",
    },
    {
      title: "Optimize for Learning Rate",
      desc: "Prioritize environments and projects where you learn the fastest. Being the smartest person in the room means you're in the wrong room.",
    },
  ];

  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Principles</h1>
        <p className="text-slate-400 font-light">
          Beliefs and philosophies that guide how I build, learn, and grow.
        </p>
      </div>

      <div className="space-y-4">
        {principles.map((principle, i) => (
          <div
            key={i}
            className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80 hover:border-slate-800/80 transition-all duration-300"
          >
            <div className="flex items-start space-x-4">
              <span className="text-purple-400 font-mono text-sm font-bold mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h2 className="text-lg font-bold text-white">{principle.title}</h2>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{principle.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};