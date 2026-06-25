import React from "react";

export const About: React.FC = () => {
  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">About</h1>
        <p className="text-slate-400 font-light">
          Who I am, what drives me, and why I build.
        </p>
      </div>

      <section className="space-y-6">
        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-xl font-bold text-white mb-4">Who I Am</h2>
          <p className="text-slate-300 leading-relaxed">
            I'm a backend-focused full-stack engineer passionate about building systems that scale.
            My approach combines deep technical understanding with pragmatic engineering — I don't
            just write code that works, I understand why it works.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-xl font-bold text-white mb-4">What Drives Me</h2>
          <p className="text-slate-300 leading-relaxed">
            I believe in learning by building. Every project is an opportunity to push into
            unknown territory, whether it's agentic AI architectures, low-latency WebSocket systems,
            or compiler optimization pipelines. I'm driven by curiosity about how systems work
            at every layer — from the kernel up to the UI.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-xl font-bold text-white mb-4">Why I Build</h2>
          <p className="text-slate-300 leading-relaxed">
            I build to solve real problems and to prove what's possible. Each project in my
            portfolio represents not just a technical challenge overcome, but a lesson learned
            and a capability earned. I value execution over consumption — reading about systems
            is useful, but building them is transformative.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-xl font-bold text-white mb-4">Areas of Interest</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "Backend Systems",
              "Agentic AI",
              "Linux & OS Internals",
              "Cybersecurity",
              "Robotics & Drones",
              "Distributed Systems",
              "Systems Thinking",
            ].map((area) => (
              <span
                key={area}
                className="px-3 py-1.5 text-sm font-mono text-purple-300 bg-purple-500/10 border border-purple-500/20 rounded-lg"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-xl font-bold text-white mb-4">Long-Term Goals</h2>
          <ul className="space-y-3">
            {[
              "Architect production-grade distributed systems at scale",
              "Contribute meaningfully to open-source infrastructure projects",
              "Bridge the gap between AI research and production engineering",
              "Build tools that empower other developers to ship better software",
            ].map((goal, i) => (
              <li key={i} className="flex items-start space-x-3 text-slate-300">
                <span className="text-purple-400 mt-0.5">→</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};