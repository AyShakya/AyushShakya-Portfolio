import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginWithGoogle,
  fetchContactMessages,
  deleteContactMessage,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  fetchNotes,
  createNote,
  updateNote,
  deleteNote,
  fetchExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  fetchJourneys,
  createJourney,
  updateJourney,
  deleteJourney,
  type ProjectData,
  type NoteData,
  type ExperienceData,
  type JourneyData,
  type ContactMessageData,
} from "../api";

declare global {
  interface Window {
    google: any;
  }
}

type TabType = "messages" | "projects" | "notes" | "experiences" | "journey";

export const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; picture: string } | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("messages");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Data states
  const [messages, setMessages] = useState<ContactMessageData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [notes, setNotes] = useState<NoteData[]>([]);
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [journeys, setJourneys] = useState<JourneyData[]>([]);

  // Form states
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Entity-specific forms
  const [projectForm, setProjectForm] = useState<Omit<ProjectData, "_id">>({
    name: "",
    tag: "",
    desc: "",
    problem: "",
    architecture: "",
    techStack: [],
    metrics: "",
    featured: false,
  });

  const [noteForm, setNoteForm] = useState<Omit<NoteData, "_id">>({
    title: "",
    category: "",
    readTime: "",
    snippet: "",
    content: "",
    featured: false,
  });

  const [experienceForm, setExperienceForm] = useState<Omit<ExperienceData, "_id">>({
    role: "",
    organization: "",
    duration: "",
    responsibilities: [],
    achievements: [],
    techUsed: [],
    proofLinks: [],
    featured: false,
  });

  const [journeyForm, setJourneyForm] = useState<Omit<JourneyData, "_id">>({
    year: "",
    title: "",
    desc: "",
    featured: false,
  });

  // Check existing token
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const userStr = localStorage.getItem("admin_user");
    if (token && userStr) {
      setIsLoggedIn(true);
      setAdminUser(JSON.parse(userStr));
    }
  }, []);

  // Fetch data depending on active tab
  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    setError(null);

    const loadData = async () => {
      try {
        if (activeTab === "messages") {
          const data = await fetchContactMessages();
          setMessages(data);
        } else if (activeTab === "projects") {
          const data = await fetchProjects();
          setProjects(data);
        } else if (activeTab === "notes") {
          const data = await fetchNotes();
          setNotes(data);
        } else if (activeTab === "experiences") {
          const data = await fetchExperiences();
          setExperiences(data);
        } else if (activeTab === "journey") {
          const data = await fetchJourneys();
          setJourneys(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch database records. Access may be expired.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isLoggedIn, activeTab]);

  // Google OAuth Initialize
  useEffect(() => {
    if (isLoggedIn) return;

    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setError("Google Client ID is missing. Please set VITE_GOOGLE_CLIENT_ID in your frontend .env file.");
      return;
    }

    const initGoogleAuth = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response: any) => {
            loginWithGoogle(response.credential)
              .then((res) => {
                localStorage.setItem("admin_token", res.token);
                localStorage.setItem("admin_user", JSON.stringify(res.admin));
                setIsLoggedIn(true);
                setAdminUser(res.admin);
                setError(null);
              })
              .catch((err) => {
                setError(err.message || "Google Login verification failed");
              });
          },
        });

        window.google.accounts.id.renderButton(
          document.getElementById("google-login-button"),
          { theme: "filled_blue", size: "large", text: "signin_with" }
        );
      } else {
        // Retry if script loading deferred
        setTimeout(initGoogleAuth, 500);
      }
    };

    initGoogleAuth();
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setIsLoggedIn(false);
    setAdminUser(null);
    navigate("/");
  };

  // Delete message
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteContactMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch {
      setError("Failed to delete message");
    }
  };

  // Submit operations
  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateProject(editingId, projectForm);
        setProjects((prev) => prev.map((p) => (p._id === editingId ? updated : p)));
      } else {
        const created = await createProject(projectForm);
        setProjects((prev) => [created, ...prev]);
      }
      resetForm();
    } catch {
      setError("Failed to save project");
    }
  };

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateNote(editingId, noteForm);
        setNotes((prev) => prev.map((n) => (n._id === editingId ? updated : n)));
      } else {
        const created = await createNote(noteForm);
        setNotes((prev) => [created, ...prev]);
      }
      resetForm();
    } catch {
      setError("Failed to save note");
    }
  };

  const handleExperienceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateExperience(editingId, experienceForm);
        setExperiences((prev) => prev.map((ex) => (ex._id === editingId ? updated : ex)));
      } else {
        const created = await createExperience(experienceForm);
        setExperiences((prev) => [created, ...prev]);
      }
      resetForm();
    } catch {
      setError("Failed to save experience");
    }
  };

  const handleJourneySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const updated = await updateJourney(editingId, journeyForm);
        setJourneys((prev) => prev.map((j) => (j._id === editingId ? updated : j)));
      } else {
        const created = await createJourney(journeyForm);
        setJourneys((prev) => [created, ...prev]);
      }
      resetForm();
    } catch {
      setError("Failed to save journey entry");
    }
  };

  // Delete operations
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Delete project?")) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch {
      setError("Delete project failed");
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm("Delete note?")) return;
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch {
      setError("Delete note failed");
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!window.confirm("Delete experience?")) return;
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((ex) => ex._id !== id));
    } catch {
      setError("Delete experience failed");
    }
  };

  const handleDeleteJourney = async (id: string) => {
    if (!window.confirm("Delete journey record?")) return;
    try {
      await deleteJourney(id);
      setJourneys((prev) => prev.filter((j) => j._id !== id));
    } catch {
      setError("Delete journey failed");
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setShowForm(false);
    setProjectForm({
      name: "",
      tag: "",
      desc: "",
      problem: "",
      architecture: "",
      techStack: [],
      metrics: "",
      featured: false,
    });
    setNoteForm({
      title: "",
      category: "",
      readTime: "",
      snippet: "",
      content: "",
      featured: false,
    });
    setExperienceForm({
      role: "",
      organization: "",
      duration: "",
      responsibilities: [],
      achievements: [],
      techUsed: [],
      proofLinks: [],
      featured: false,
    });
    setJourneyForm({
      year: "",
      title: "",
      desc: "",
      featured: false,
    });
  };

  const startEditProject = (p: ProjectData) => {
    setEditingId(p._id);
    setProjectForm({
      name: p.name || "",
      tag: p.tag || "",
      desc: p.desc || "",
      problem: p.problem || "",
      architecture: p.architecture || "",
      techStack: p.techStack || [],
      metrics: p.metrics || "",
      featured: !!p.featured,
    });
    setShowForm(true);
  };

  const startEditNote = (n: NoteData) => {
    setEditingId(n._id);
    setNoteForm({
      title: n.title || "",
      category: n.category || "",
      readTime: n.readTime || "",
      snippet: n.snippet || "",
      content: n.content || "",
      featured: !!n.featured,
    });
    setShowForm(true);
  };

  const startEditExperience = (ex: ExperienceData) => {
    setEditingId(ex._id);
    setExperienceForm({
      role: ex.role || "",
      organization: ex.organization || "",
      duration: ex.duration || "",
      responsibilities: ex.responsibilities || [],
      achievements: ex.achievements || [],
      techUsed: ex.techUsed || [],
      proofLinks: ex.proofLinks || [],
      featured: !!ex.featured,
    });
    setShowForm(true);
  };

  const startEditJourney = (j: JourneyData) => {
    setEditingId(j._id);
    setJourneyForm({
      year: j.year || "",
      title: j.title || "",
      desc: j.desc || "",
      featured: !!j.featured,
    });
    setShowForm(true);
  };

  // Google Login Layout
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6">
        <div className="w-full max-w-md bg-slate-900/30 border border-slate-900 rounded-2xl p-8 space-y-8 shadow-xl">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">
              Only authorized site owners can log in here.
            </p>
          </div>

          {error && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs font-mono">
              {error}
            </div>
          )}

          <div className="flex justify-center pt-4">
            <div id="google-login-button"></div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Layout
  return (
    <div className="space-y-8 py-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between p-6 bg-slate-900/30 border border-slate-900 rounded-2xl gap-4">
        <div className="flex items-center space-x-4">
          {adminUser?.picture && (
            <img src={adminUser.picture} alt="profile" className="h-12 w-12 rounded-full border border-purple-500/30" />
          )}
          <div>
            <h2 className="text-lg font-bold text-white">Welcome, {adminUser?.name}</h2>
            <p className="text-xs text-slate-500 font-mono">{adminUser?.email} (Admin)</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-xs font-mono text-slate-400 bg-slate-950 border border-slate-800 hover:border-rose-500/30 hover:text-rose-400 rounded-lg transition-colors cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-900 pb-3">
        {(["messages", "projects", "notes", "experiences", "journey"] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              resetForm();
            }}
            className={`px-4 py-2 text-sm font-mono rounded-lg transition-colors cursor-pointer capitalize ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "text-slate-400 bg-slate-950 border border-slate-900 hover:border-slate-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-sm font-mono">
          {error}
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center py-12 space-y-3">
          <div className="h-6 w-6 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
          <p className="text-xs text-slate-500 font-mono">Fetching data...</p>
        </div>
      )}

      {/* Messages Panel */}
      {!loading && activeTab === "messages" && (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono mb-4">
            Contact Submissions ({messages.length})
          </h3>
          {messages.length === 0 ? (
            <p className="text-slate-500 font-mono text-sm">No contact messages received.</p>
          ) : (
            <div className="grid gap-4">
              {messages.map((m) => (
                <div key={m._id} className="p-5 bg-slate-900/20 border border-slate-900 rounded-xl space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-white">{m.name}</h4>
                      <p className="text-xs text-purple-400 font-mono">{m.email}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-[10px] text-slate-600 font-mono">
                        {new Date(m.createdAt).toLocaleString()}
                      </span>
                      <button
                        onClick={() => handleDeleteMessage(m._id)}
                        className="text-xs text-rose-500 hover:text-rose-400 font-mono"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 bg-slate-950/40 p-3 rounded-lg border border-slate-900/60 leading-relaxed">
                    {m.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Projects Panel */}
      {!loading && activeTab === "projects" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Manage Projects ({projects.length})
            </h3>
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-3 py-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded font-mono cursor-pointer"
              >
                + Add Project
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleProjectSubmit} className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl space-y-4 max-w-xl">
              <h4 className="font-bold text-white font-mono">{editingId ? "Edit Project" : "New Project"}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Tag</label>
                  <input
                    type="text"
                    required
                    value={projectForm.tag}
                    onChange={(e) => setProjectForm({ ...projectForm, tag: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                    placeholder="e.g. Systems, Agentic AI"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={projectForm.desc}
                  onChange={(e) => setProjectForm({ ...projectForm, desc: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Metrics (latency, speedup, etc.)</label>
                  <input
                    type="text"
                    value={projectForm.metrics}
                    onChange={(e) => setProjectForm({ ...projectForm, metrics: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Tech Stack (comma-separated)</label>
                  <input
                    type="text"
                    value={projectForm.techStack.join(", ")}
                    onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Problem Statement</label>
                <textarea
                  rows={2}
                  value={projectForm.problem}
                  onChange={(e) => setProjectForm({ ...projectForm, problem: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Architecture details</label>
                <textarea
                  rows={2}
                  value={projectForm.architecture}
                  onChange={(e) => setProjectForm({ ...projectForm, architecture: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured-proj"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-0"
                />
                <label htmlFor="featured-proj" className="text-xs font-mono text-slate-400">Featured Project</label>
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-mono cursor-pointer"
                >
                  Save Project
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 rounded text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-3">
            {projects.map((p) => (
              <div key={p._id} className="flex items-center justify-between p-4 bg-slate-900/10 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="font-bold text-white">{p.name}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{p.tag} · {p.metrics || "No Metrics"}</p>
                </div>
                <div className="flex space-x-4 text-xs font-mono">
                  <button onClick={() => startEditProject(p)} className="text-purple-400 hover:text-purple-300">Edit</button>
                  <button onClick={() => handleDeleteProject(p._id)} className="text-rose-500 hover:text-rose-400">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes Panel */}
      {!loading && activeTab === "notes" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Manage Notes ({notes.length})
            </h3>
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-3 py-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded font-mono cursor-pointer"
              >
                + Add Note
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleNoteSubmit} className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl space-y-4 max-w-xl">
              <h4 className="font-bold text-white font-mono">{editingId ? "Edit Note" : "New Note"}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={noteForm.title}
                    onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={noteForm.category}
                    onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                    placeholder="e.g. AI Engineering"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Read Time</label>
                  <input
                    type="text"
                    required
                    value={noteForm.readTime}
                    onChange={(e) => setNoteForm({ ...noteForm, readTime: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                    placeholder="e.g. 5 min read"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Snippet</label>
                  <input
                    type="text"
                    required
                    value={noteForm.snippet}
                    onChange={(e) => setNoteForm({ ...noteForm, snippet: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                    placeholder="Short meta snippet description"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Content (Markdown / Body)</label>
                <textarea
                  rows={6}
                  value={noteForm.content}
                  onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300 font-mono"
                  placeholder="Detailed note documentation text..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured-note"
                  checked={noteForm.featured}
                  onChange={(e) => setNoteForm({ ...noteForm, featured: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-purple-600 focus:ring-0"
                />
                <label htmlFor="featured-note" className="text-xs font-mono text-slate-400">Featured Note</label>
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-mono cursor-pointer"
                >
                  Save Note
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 rounded text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-3">
            {notes.map((n) => (
              <div key={n._id} className="flex items-center justify-between p-4 bg-slate-900/10 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="font-bold text-white">{n.title}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{n.category} · {n.readTime}</p>
                </div>
                <div className="flex space-x-4 text-xs font-mono">
                  <button onClick={() => startEditNote(n)} className="text-purple-400 hover:text-purple-300">Edit</button>
                  <button onClick={() => handleDeleteNote(n._id)} className="text-rose-500 hover:text-rose-400">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience Panel */}
      {!loading && activeTab === "experiences" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Manage Experiences ({experiences.length})
            </h3>
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-3 py-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded font-mono cursor-pointer"
              >
                + Add Experience
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleExperienceSubmit} className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl space-y-4 max-w-xl">
              <h4 className="font-bold text-white font-mono">{editingId ? "Edit Experience" : "New Experience"}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Role</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.role}
                    onChange={(e) => setExperienceForm({ ...experienceForm, role: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Organization</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.organization}
                    onChange={(e) => setExperienceForm({ ...experienceForm, organization: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={experienceForm.duration}
                    onChange={(e) => setExperienceForm({ ...experienceForm, duration: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                    placeholder="e.g. Jun 2024 - Present"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Tech Used (comma-separated)</label>
                  <input
                    type="text"
                    value={experienceForm.techUsed.join(", ")}
                    onChange={(e) => setExperienceForm({ ...experienceForm, techUsed: e.target.value.split(",").map(s => s.trim()).filter(Boolean) })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Responsibilities (one per line)</label>
                <textarea
                  rows={3}
                  value={experienceForm.responsibilities.join("\n")}
                  onChange={(e) => setExperienceForm({ ...experienceForm, responsibilities: e.target.value.split("\n").filter(Boolean) })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Achievements (one per line)</label>
                <textarea
                  rows={3}
                  value={experienceForm.achievements.join("\n")}
                  onChange={(e) => setExperienceForm({ ...experienceForm, achievements: e.target.value.split("\n").filter(Boolean) })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-mono cursor-pointer"
                >
                  Save Experience
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 rounded text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-3">
            {experiences.map((ex) => (
              <div key={ex._id} className="flex items-center justify-between p-4 bg-slate-900/10 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="font-bold text-white">{ex.role}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{ex.organization} · {ex.duration}</p>
                </div>
                <div className="flex space-x-4 text-xs font-mono">
                  <button onClick={() => startEditExperience(ex)} className="text-purple-400 hover:text-purple-300">Edit</button>
                  <button onClick={() => handleDeleteExperience(ex._id)} className="text-rose-500 hover:text-rose-400">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Journey Panel */}
      {!loading && activeTab === "journey" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Manage Journey Timeline ({journeys.length})
            </h3>
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="px-3 py-1.5 text-xs bg-purple-600 hover:bg-purple-500 text-white rounded font-mono cursor-pointer"
              >
                + Add Journey Entry
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleJourneySubmit} className="p-6 bg-slate-900/30 border border-slate-800 rounded-xl space-y-4 max-w-xl">
              <h4 className="font-bold text-white font-mono">{editingId ? "Edit Timeline Entry" : "New Timeline Entry"}</h4>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-500 mb-1">Year</label>
                  <input
                    type="text"
                    required
                    value={journeyForm.year}
                    onChange={(e) => setJourneyForm({ ...journeyForm, year: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                    placeholder="e.g. 2026"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-mono text-slate-500 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={journeyForm.title}
                    onChange={(e) => setJourneyForm({ ...journeyForm, title: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-500 mb-1">Description</label>
                <textarea
                  required
                  rows={3}
                  value={journeyForm.desc}
                  onChange={(e) => setJourneyForm({ ...journeyForm, desc: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded text-sm text-slate-300"
                />
              </div>
              <div className="flex space-x-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-mono cursor-pointer"
                >
                  Save Timeline Entry
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 rounded text-xs font-mono cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="grid gap-3">
            {journeys.map((j) => (
              <div key={j._id} className="flex items-center justify-between p-4 bg-slate-900/10 border border-slate-900 rounded-xl">
                <div>
                  <h4 className="font-bold text-white">{j.title}</h4>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{j.year} · {j.desc}</p>
                </div>
                <div className="flex space-x-4 text-xs font-mono">
                  <button onClick={() => startEditJourney(j)} className="text-purple-400 hover:text-purple-300">Edit</button>
                  <button onClick={() => handleDeleteJourney(j._id)} className="text-rose-500 hover:text-rose-400">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
