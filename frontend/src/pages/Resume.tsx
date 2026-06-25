import React from "react";

export const Resume: React.FC = () => {
  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Resume</h1>
        <p className="text-slate-400 font-light">
          My professional background and qualifications.
        </p>
      </div>

      {/* Download / Online buttons */}
      <div className="flex flex-wrap gap-4">
        <a
          href="/resume.pdf"
          download
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-medium rounded-lg shadow-lg shadow-purple-500/20 transition-all duration-200 hover:-translate-y-0.5"
        >
          ↓ Download Resume (PDF)
        </a>
      </div>

      {/* Online Resume */}
      <div className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80 space-y-8">
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <h2 className="text-2xl font-bold text-white">Ayush Shakya</h2>
          <p className="text-purple-400 font-mono text-sm mt-1">Backend-Focused Full Stack Engineer</p>
          <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">
            <span>📧 ayushshakya.dev@gmail.com</span>
            <span>📍 Kathmandu, Nepal</span>
            <span>🔗 github.com/AyShakya</span>
          </div>
        </div>

        {/* Summary */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-3">
            Summary
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            Backend-focused full stack engineer with deep expertise in Node.js, TypeScript, and distributed systems.
            Proven track record architecting scalable APIs, real-time systems, and AI-powered applications.
            Passionate about understanding internals, optimizing performance, and building production-grade infrastructure.
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-3">
            Technical Skills
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { category: "Languages", skills: "TypeScript, JavaScript, Python, Go, Rust (learning)" },
              { category: "Backend", skills: "Node.js, Express, WebSockets, REST APIs, GraphQL" },
              { category: "Frontend", skills: "React, Tailwind CSS, Vite, Next.js" },
              { category: "Databases", skills: "MongoDB, PostgreSQL, Redis, Prisma" },
              { category: "DevOps", skills: "Docker, Linux, CI/CD, Git" },
              { category: "AI/ML", skills: "LLM Integration, Agentic AI, Ollama, LangChain" },
            ].map((skill) => (
              <div key={skill.category} className="p-3 rounded-lg bg-slate-950/50 border border-slate-900">
                <p className="text-xs font-mono text-purple-400 mb-1">{skill.category}</p>
                <p className="text-sm text-slate-300">{skill.skills}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-3">
            Experience
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-900">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Full Stack Developer (Freelance)</p>
                  <p className="text-xs text-purple-400 font-mono">Independent Consultant</p>
                </div>
                <span className="text-xs text-slate-500 font-mono">Jun 2024 - Present</span>
              </div>
              <ul className="mt-2 space-y-1">
                <li className="text-xs text-slate-400 flex items-start space-x-2">
                  <span>•</span>
                  <span>Architected scalable backend web applications for client integrations</span>
                </li>
                <li className="text-xs text-slate-400 flex items-start space-x-2">
                  <span>•</span>
                  <span>Built responsive interfaces with optimized performance using React and Tailwind</span>
                </li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-900">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Technical Lead & Event Coordinator</p>
                  <p className="text-xs text-purple-400 font-mono">University CS Club</p>
                </div>
                <span className="text-xs text-slate-500 font-mono">Sep 2023 - May 2024</span>
              </div>
              <ul className="mt-2 space-y-1">
                <li className="text-xs text-slate-400 flex items-start space-x-2">
                  <span>•</span>
                  <span>Coordinated technical events, hackathons, and algorithm study groups</span>
                </li>
                <li className="text-xs text-slate-400 flex items-start space-x-2">
                  <span>•</span>
                  <span>Mentored junior developers in web development stack fundamentals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-3">
            Education
          </h3>
          <div className="p-4 rounded-lg bg-slate-950/50 border border-slate-900">
            <p className="text-sm font-semibold text-white">B.E. in Computer Engineering</p>
            <p className="text-xs text-slate-400">Current Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};