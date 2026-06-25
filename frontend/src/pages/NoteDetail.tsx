import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNoteById, type NoteData } from "../api";

export const NoteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<NoteData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchNoteById(id)
      .then((data) => {
        setNote(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching note:", err);
        setError("Failed to load note.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 space-y-4">
        <div className="h-8 w-8 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
        <p className="text-sm font-mono text-slate-500">Loading engineering note...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4">
        <p className="text-rose-400 text-sm font-mono">{error}</p>
        <button
          onClick={() => navigate("/notes")}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-sm hover:border-slate-700 transition-colors cursor-pointer"
        >
          ← Back to Notes
        </button>
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="space-y-10 py-6 max-w-2xl">
      <button
        onClick={() => navigate("/notes")}
        className="flex items-center space-x-2 text-sm text-slate-500 hover:text-purple-400 transition-colors font-mono cursor-pointer"
      >
        <span>←</span>
        <span>Back to Notes</span>
      </button>

      <article>
        <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 mb-4">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
            {note.category}
          </span>
          <span>{note.readTime}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6">
          {note.title}
        </h1>

        <div className="text-sm text-slate-300 leading-relaxed space-y-4">
          <p className="text-slate-400 font-mono text-xs border-l-2 border-purple-500/30 pl-4 italic">
            {note.snippet}
          </p>

          {note.content ? (
            <div className="prose prose-invert prose-sm max-w-none mt-8">
              {note.content.split("\n").map((paragraph, i) => (
                <p key={i} className="mb-4 last:mb-0">{paragraph}</p>
              ))}
            </div>
          ) : (
            <div className="mt-8 p-6 rounded-xl bg-slate-900/30 border border-slate-900/80 text-center">
              <p className="text-slate-500 font-mono text-sm">
                Full note content coming soon.
              </p>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};