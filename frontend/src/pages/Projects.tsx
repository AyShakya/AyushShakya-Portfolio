import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProjects, type ProjectData } from "../api";

export const Projects: React.FC = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please make sure the backend server and MongoDB are running.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Projects</h1>
        <p className="text-slate-400 font-light">
          A showcase of engineering proofs-of-work, featuring architecture-first building.
        </p>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="h-8 w-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
          <p className="text-sm font-mono text-slate-500">Querying database records...</p>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm font-mono max-w-lg">
          {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-slate-500 font-mono text-sm py-12">No projects found in database.</p>
      )}

      {!loading && !error && projects.length > 0 && (
        <div className="grid md:grid-cols-2 gap-8 pt-6">
          {projects.map((project) => (
            <button
              key={project._id}
              onClick={() => navigate(`/projects/${project._id}`)}
              className="p-6 rounded-xl bg-slate-900/40 border border-slate-900 hover:border-slate-800/80 hover:bg-slate-900/60 transition-all duration-300 flex flex-col justify-between text-left cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-400 font-mono px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                    {project.tag}
                  </span>
                  {project.metrics && (
                    <span className="text-xs text-slate-500 font-mono">{project.metrics}</span>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mt-4">{project.name}</h3>
                <p className="text-sm text-slate-400 mt-2 leading-relaxed">{project.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-900/80">
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((t) => (
                      <span key={t} className="text-xs font-mono text-slate-500 px-2 py-0.5 bg-slate-950 border border-slate-900 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs text-purple-400 hover:text-purple-300 font-medium">
                  <span>View Full Architecture Study</span>
                  <span>→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};