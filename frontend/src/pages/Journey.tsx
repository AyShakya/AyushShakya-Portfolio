import React, { useEffect, useState } from "react";
import { fetchJourneys, type JourneyData } from "../api";

export const Journey: React.FC = () => {
  const [journeys, setJourneys] = useState<JourneyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJourneys()
      .then((data) => {
        // Sort journeys by year descending, or let MongoDB sort it
        setJourneys(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching journey data:", err);
        setError("Failed to load journey milestones. Please verify the backend API connection.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Journey</h1>
        <p className="text-slate-400 font-light">
          A developmental map tracing milestones, focus areas, and skill accumulation.
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

      {!loading && !error && journeys.length === 0 && (
        <p className="text-slate-500 font-mono text-sm py-12">No journey milestones found in database.</p>
      )}

      {!loading && !error && journeys.length > 0 && (
        <div className="relative border-l border-slate-800 ml-4 pl-8 space-y-12 py-6">
          {journeys.map((item, index) => (
            <div key={item._id || index} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-12 top-1.5 h-4 w-4 rounded-full border-2 border-slate-800 bg-slate-950 group-hover:border-purple-500 transition-colors duration-300 flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-purple-500/0 group-hover:bg-purple-500 transition-colors duration-300" />
              </div>
              
              <div className="space-y-2">
                <span className="text-sm font-mono font-bold text-purple-400">{item.year}</span>
                <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed max-w-xl">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
