import React, { useEffect, useState } from "react";
import { fetchNotes, type NoteData } from "../api";

export const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotes()
      .then((data) => {
        setNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        setError("Failed to load notes. Please verify the backend API connection.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-10 py-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Engineering Notes</h1>
        <p className="text-slate-400 font-light">
          A personal knowledge base containing technical insights, system architectures, and deep dives.
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

      {!loading && !error && notes.length === 0 && (
        <p className="text-slate-500 font-mono text-sm py-12">No engineering notes found in database.</p>
      )}

      {!loading && !error && notes.length > 0 && (
        <div className="space-y-6 pt-6 max-w-2xl">
          {notes.map((note) => (
            <article
              key={note._id}
              className="p-6 rounded-xl bg-slate-900/30 border border-slate-900 hover:border-slate-800/80 transition-all duration-300 hover:bg-slate-900/50 cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-3">
                <span>{note.category}</span>
                <span>{note.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-white hover:text-purple-300 transition-colors">
                {note.title}
              </h3>
              <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                {note.snippet}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};
