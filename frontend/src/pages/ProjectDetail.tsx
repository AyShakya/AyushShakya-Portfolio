import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProjectById, type ProjectData } from "../api";

export const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchProjectById(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching project:", err);
        setError("Failed to load project details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="h-8 w-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
        <p className="text-sm font-mono text-slate-500">Loading project architecture...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <p className="text-rose-400 text-sm font-mono">{error}</p>
        <button
          onClick={() => navigate("/projects")}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-sm hover:border-slate-700 transition-colors cursor-pointer"
        >
          ← Back to Projects
        </button>
      </div>
    );
  }

  if (!project) return null;

  return (
    <div className="space-y-10 py-6">
      {/* Back button */}
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center space-x-2 text-sm text-slate-500 hover:text-purple-400 transition-colors font-mono cursor-pointer"
      >
        <span>←</span>
        <span>Back to Projects</span>
      </button>

      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <span className="text-xs text-purple-400 font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
            {project.tag}
          </span>
          {project.metrics && (
            <span className="text-xs text-slate-500 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {project.metrics}
            </span>
          )}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          {project.name}
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">{project.desc}</p>
      </div>

      {/* Links */}
      {(project.githubUrl || project.liveDemoUrl) && (
        <div className="flex flex-wrap gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-sm hover:border-slate-700 transition-all font-mono"
            >
              ⌨ View on GitHub
            </a>
          )}
          {project.liveDemoUrl && (
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm transition-all font-mono"
            >
              ↗ Live Demo
            </a>
          )}
        </div>
      )}

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono text-slate-400 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Problem */}
      {project.problem && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-3">
            Problem
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">{project.problem}</p>
        </section>
      )}

      {/* Architecture */}
      {project.architecture && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-3">
            Architecture
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed leading-relaxed">{project.architecture}</p>
        </section>
      )}

      {/* Challenges */}
      {project.challenges && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-3">
            Challenges
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">{project.challenges}</p>
        </section>
      )}

      {/* Technical Decisions */}
      {project.technicalDecisions && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-3">
            Technical Decisions
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">{project.technicalDecisions}</p>
        </section>
      )}

      {/* Lessons Learned */}
      {project.lessonsLearned && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-3">
            Lessons Learned
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">{project.lessonsLearned}</p>
        </section>
      )}

      {/* Future Improvements */}
      {project.futureImprovements && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-3">
            Future Improvements
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">{project.futureImprovements}</p>
        </section>
      )}

      {/* Architecture Diagrams */}
      {project.architectureDiagrams && project.architectureDiagrams.length > 0 && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-4">
            Architecture Diagrams
          </h2>
          <div className="grid gap-4">
            {project.architectureDiagrams.map((diagram, i) => (
              <div key={i} className="rounded-lg bg-slate-950/50 border border-slate-800 p-4">
                <img
                  src={diagram}
                  alt={`Architecture diagram ${i + 1}`}
                  className="w-full rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <p className="text-xs text-slate-500 font-mono mt-2">
                  Architecture Diagram {i + 1}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="p-6 rounded-xl bg-slate-900/30 border border-slate-900/80">
          <h2 className="text-sm font-semibold tracking-wider text-purple-400 uppercase font-mono mb-4">
            Screenshots
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.screenshots.map((screenshot, i) => (
              <div key={i} className="rounded-lg bg-slate-950/50 border border-slate-800 p-2">
                <img
                  src={screenshot}
                  alt={`Screenshot ${i + 1}`}
                  className="w-full rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};