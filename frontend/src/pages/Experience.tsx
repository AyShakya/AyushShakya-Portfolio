import React, { useEffect, useState } from "react";
import { fetchExperiences, type ExperienceData } from "../api";

export const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences()
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching experiences:", err);
        setError("Failed to load experiences. Please verify the backend API connection.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Experience</h1>
        <p className="text-slate-400 font-light">
          Professional timeline, contract consulting, and leadership roles.
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

      {!loading && !error && experiences.length === 0 && (
        <p className="text-slate-500 font-mono text-sm py-12">No experience records found in database.</p>
      )}

      {!loading && !error && experiences.length > 0 && (
        <div className="space-y-12 pt-6">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="p-6 rounded-xl bg-slate-900/30 border border-slate-900 hover:border-slate-800/60 transition-all duration-300 space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-sm text-purple-400 font-mono mt-1">{exp.organization}</p>
                </div>
                <span className="text-xs text-slate-500 font-mono bg-slate-950 px-3 py-1 rounded border border-slate-900 self-start md:self-center">
                  {exp.duration}
                </span>
              </div>

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                    Responsibilities
                  </h4>
                  <ul className="list-disc list-inside text-sm text-slate-400 space-y-1 pl-1">
                    {exp.responsibilities.map((resp, index) => (
                      <li key={index} className="leading-relaxed">
                        <span className="text-slate-300">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {exp.achievements && exp.achievements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold tracking-wider text-slate-500 uppercase">
                    Key Achievements
                  </h4>
                  <ul className="list-disc list-inside text-sm text-slate-400 space-y-1 pl-1">
                    {exp.achievements.map((ach, index) => (
                      <li key={index} className="leading-relaxed">
                        <span className="text-slate-300">{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-4 border-t border-slate-900/60 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {exp.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-slate-500 px-2 py-0.5 bg-slate-950 border border-slate-900 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {exp.proofLinks && exp.proofLinks.length > 0 && (
                  <div className="flex gap-4">
                    {exp.proofLinks.map((link, idx) => (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:text-purple-300 font-mono underline"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
