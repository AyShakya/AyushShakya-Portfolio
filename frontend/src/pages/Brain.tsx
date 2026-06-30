import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllNotes, getNoteById, getJourneyContent, getPrinciplesContent } from "../utils/markdown";
import { MarkdownRenderer } from "../components/MarkdownRenderer";

export const Brain: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeNoteId = searchParams.get("note");
  const activeTabParam = searchParams.get("tab") as "notes" | "principles" | "journey" | "exploring" | null;

  const [activeTab, setActiveTab] = useState<"notes" | "principles" | "journey" | "exploring">("notes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const notes = getAllNotes();
  const journey = getJourneyContent();
  const principles = getPrinciplesContent();

  const categories = ["All", ...Array.from(new Set(notes.map((n) => n.metadata.category)))];

  const exploringTopics = [
    { title: "Advanced Linux Kernel Namespaces", desc: "Understanding container isolations at the syscall layer." },
    { title: "Low-Latency WebSocket relays in Go", desc: "Architecting concurrent servers scaling to 200k connections." },
    { title: "Embedded Control Loops for Drones", desc: "Experimenting with basic navigation software." },
    { title: "Cybersecurity & Web Penetration Testing", desc: "Securing APIs, hashing, and token loops." }
  ];

  // Sync tab with URL search parameter
  useEffect(() => {
    if (activeTabParam) {
      setActiveTab(activeTabParam);
    }
  }, [activeTabParam]);

  useEffect(() => {
    if (activeNoteId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeNoteId]);

  const handleTabChange = (tab: "notes" | "principles" | "journey" | "exploring") => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const handleNoteSelect = (id: string) => {
    setSearchParams({ note: id });
  };

  const handleCloseNote = () => {
    setSearchParams({ tab: "notes" });
  };

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.metadata.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === "All" || note.metadata.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Render Note detail view if requested
  if (activeNoteId) {
    const note = getNoteById(activeNoteId);
    if (note) {
      return (
        <div className="space-y-10 py-6 animate-fade-in max-w-3xl mx-auto">
          <button
            onClick={handleCloseNote}
            className="flex items-center space-x-2 text-sm text-slate-500 hover:text-purple-400 transition-colors font-mono cursor-pointer"
          >
            <span>←</span>
            <span>Back to Notes</span>
          </button>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {note.metadata.category}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {note.metadata.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
              {note.metadata.title}
            </h1>
          </div>

          <div className="pt-6 border-t border-slate-900">
            <MarkdownRenderer content={note.content} />
          </div>
        </div>
      );
    }
  }

  return (
    <div className="space-y-10 py-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">Brain</h1>
        <p className="text-slate-400 font-light">
          My personal developer log: technical notes, core values, system journey, and ongoing research.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-slate-900 gap-2 font-mono text-xs md:text-sm">
        {[
          { id: "notes", label: "Knowledge Base" },
          { id: "principles", label: "Principles" },
          { id: "journey", label: "Journey" },
          { id: "exploring", label: "Currently Exploring" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id as any)}
            className={`px-4 py-2.5 -mb-px border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border-purple-500 text-purple-400 font-semibold"
                : "border-transparent text-slate-500 hover:text-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        {/* Knowledge Base Section */}
        {activeTab === "notes" && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 w-full sm:max-w-xs font-mono"
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 text-xs rounded-lg font-mono border transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-purple-500/10 border-purple-500/30 text-purple-300"
                        : "bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-400"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes List */}
            {filteredNotes.length === 0 ? (
              <p className="text-sm font-mono text-slate-500 py-6">No matching logs found.</p>
            ) : (
              <div className="space-y-4">
                {filteredNotes.map((note) => (
                  <button
                    key={note.metadata.id}
                    onClick={() => handleNoteSelect(note.metadata.id)}
                    className="w-full p-5 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-800 hover:bg-slate-900/20 transition-all duration-300 text-left cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] text-slate-500 font-mono">{note.metadata.category}</span>
                      <h3 className="text-base font-bold text-white">{note.metadata.title}</h3>
                      <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{note.metadata.snippet}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0 bg-slate-950 px-2.5 py-1 rounded border border-slate-900 self-start md:self-center">
                      {note.metadata.readTime}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Principles Section */}
        {activeTab === "principles" && (
          <div className="p-6 rounded-xl bg-slate-900/5 border border-slate-900">
            <MarkdownRenderer content={principles.content} />
          </div>
        )}

        {/* Journey Section */}
        {activeTab === "journey" && (
          <div className="p-6 rounded-xl bg-slate-900/5 border border-slate-900">
            <MarkdownRenderer content={journey.content} />
          </div>
        )}

        {/* Currently Exploring Section */}
        {activeTab === "exploring" && (
          <div className="grid md:grid-cols-2 gap-4">
            {exploringTopics.map((topic, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-900/10 border border-slate-900 hover:border-slate-800 transition-all duration-300"
              >
                <h3 className="text-base font-bold text-white mb-2">{topic.title}</h3>
                <p className="text-xs md:text-sm text-slate-400 leading-relaxed">{topic.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
