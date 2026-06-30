import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllProjects, getProjectById } from "../utils/markdown";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

interface ExperienceItem {
  role: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  techUsed: string[];
  proofLinks?: { label: string; url: string }[];
}

interface CertificateItem {
  title: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  skills: string[];
}

export const Work: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeProjectId = searchParams.get("project");
  const [activeTab, setActiveTab] = useState<"all" | "projects" | "experience" | "certificates">("all");

  const projects = getAllProjects();

  const experiences: ExperienceItem[] = [
    {
      role: "Full Stack Developer (Freelance)",
      organization: "Independent Consultant / Self-Employed",
      duration: "Jun 2024 - Present",
      responsibilities: [
        "Architected scalable backend web applications for client integrations.",
        "Built responsive interfaces with optimized performance using React and Tailwind."
      ],
      achievements: [
        "Delivered 5+ web applications on time with 100% satisfaction score.",
        "Decreased average database query latency by 35% through indexing optimizations."
      ],
      techUsed: ["React", "Express", "Node.js", "MongoDB", "Tailwind CSS"],
      proofLinks: [{ label: "Freelance Review", url: "https://example.com" }]
    },
    {
      role: "Technical Lead & Event Coordinator",
      organization: "University Computer Science Club",
      duration: "Sep 2023 - May 2024",
      responsibilities: [
        "Coordinated technical events, hackathons, and algorithm study groups.",
        "Mentored junior developers in web development stack fundamentals."
      ],
      achievements: [
        "Successfully organized club hackathon with over 150 active participants.",
        "Guided a team of 4 members in building the club's event registration system."
      ],
      techUsed: ["Git", "React", "NodeJS", "JavaScript"],
      proofLinks: [{ label: "CS Club Event Link", url: "https://example.com" }]
    }
  ];

  const certificates: CertificateItem[] = [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      date: "Dec 2025",
      credentialUrl: "https://example.com",
      skills: ["Cloud Architecture", "AWS Services", "IAM", "VPC"]
    },
    {
      title: "Advanced Software Engineering Certificate",
      issuer: "HackerRank",
      date: "Aug 2024",
      credentialUrl: "https://example.com",
      skills: ["Problem Solving", "Data Structures", "Algorithms", "System Design"]
    },
    {
      title: "Backend Development Professional",
      issuer: "Meta / Coursera",
      date: "May 2024",
      credentialUrl: "https://example.com",
      skills: ["APIs", "Django", "SQL", "Git"]
    }
  ];

  // Sync tab filtering if deep-linked project is closed
  useEffect(() => {
    if (activeProjectId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeProjectId]);

  const handleProjectSelect = (id: string) => {
    setSearchParams({ project: id });
  };

  const handleCloseProject = () => {
    searchParams.delete("project");
    setSearchParams(searchParams);
  };

  // Render detail view if a project is active
  if (activeProjectId) {
    const project = getProjectById(activeProjectId);
    if (project) {
      return (
        <div className="space-y-10 py-6 animate-fade-in max-w-3xl mx-auto">
          <button
            onClick={handleCloseProject}
            className="flex items-center space-x-2 text-sm text-slate-500 hover:text-purple-400 transition-colors font-mono cursor-pointer"
          >
            <span>←</span>
            <span>Back to Work Overview</span>
          </button>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-purple-400 font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                {project.metadata.tag}
              </span>
              {project.metadata.metrics && (
                <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                  {project.metadata.metrics}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              {project.metadata.name}
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.metadata.githubUrl && (
              <a
                href={project.metadata.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-300 rounded-lg text-xs font-mono transition-colors"
              >
                ⌨ GitHub
              </a>
            )}
            {project.metadata.liveDemoUrl && (
              <a
                href={project.metadata.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600/90 hover:bg-purple-600 text-white rounded-lg text-xs font-mono transition-colors"
              >
                ↗ Demo
              </a>
            )}
          </div>

          {project.metadata.techStack && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-900">
              {project.metadata.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-mono text-slate-500 px-2 py-0.5 bg-slate-950 border border-slate-900 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-slate-900">
            <MarkdownRenderer content={project.content} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-10 py-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Work</h1>
        <p className="text-slate-400 font-light">
          Engineering case studies, commercial projects, timeline experience, and verified badges.
        </p>
      </div>

      {/* Tabs / Filtering */}
      <div className="flex flex-wrap border-b border-slate-900 gap-2 font-mono text-xs md:text-sm">
        {(["all", "projects", "experience", "certificates"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 -mb-px border-b-2 capitalize transition-all cursor-pointer ${
              activeTab === tab
                ? "border-purple-500 text-purple-400 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-12">
        {/* Projects Section */}
        {(activeTab === "all" || activeTab === "projects") && (
          <section className="space-y-6">
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase font-mono">
                Case Studies & Codebases
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <button
                  key={project.metadata.id}
                  onClick={() => handleProjectSelect(project.metadata.id)}
                  className="p-6 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/20 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-[10px] text-purple-400 font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                        {project.metadata.tag}
                      </span>
                      {project.metadata.metrics && (
                        <span className="text-xs text-slate-500 font-mono">{project.metadata.metrics}</span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mt-4">{project.metadata.name}</h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed line-clamp-3">
                      {project.metadata.name === "WatcherAgent" && "An intelligent autonomous file watcher and builder agent designed to track modifications and run builds automatically."}
                      {project.metadata.name === "Catalyst" && "A production-grade reactive builder engine and compilation optimizer built to streamline frontend build pipelines."}
                      {project.metadata.name === "LiveDesk" && "Collaborative real-time remote infrastructure manager allowing full virtual desktop control from the browser."}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-900/80">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.metadata.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-slate-500 px-2 py-0.5 bg-slate-950 border border-slate-900 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-purple-400 font-medium">
                      <span>View Engineering Details</span>
                      <span>→</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {(activeTab === "all" || activeTab === "experience") && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase font-mono">
                Professional Timeline
              </h2>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-850 transition-all duration-300 space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                      <p className="text-xs font-mono text-purple-400 mt-0.5">{exp.organization}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-900 self-start md:self-center">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="list-disc pl-5 text-sm text-slate-400 space-y-1.5">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-slate-300 font-medium">{ach}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-900/60">
                    <div className="flex flex-wrap gap-1.5">
                      {exp.techUsed.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-slate-500 px-2 py-0.5 bg-slate-950 border border-slate-900 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {exp.proofLinks && exp.proofLinks.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:underline font-mono"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates Section */}
        {(activeTab === "all" || activeTab === "certificates") && (
          <section className="space-y-6 pt-4">
            <div className="flex items-center space-x-2">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase font-mono">
                Verified Credentials
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-855 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{cert.issuer}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{cert.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-white">{cert.title}</h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((s) => (
                        <span key={s} className="text-[9px] font-mono text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-900">
                          {s}
                        </span>
                      ))}
                    </div>

                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-purple-400 hover:underline font-mono"
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
