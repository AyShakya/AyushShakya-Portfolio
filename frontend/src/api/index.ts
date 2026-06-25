const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export interface HealthStatus {
  status: string;
  message: string;
  timestamp?: string;
}

export interface ProjectData {
  _id: string;
  name: string;
  tag: string;
  desc: string;
  problem?: string;
  architecture?: string;
  techStack: string[];
  challenges?: string;
  technicalDecisions?: string;
  lessonsLearned?: string;
  futureImprovements?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  metrics?: string;
  screenshots?: string[];
  architectureDiagrams?: string[];
  featured?: boolean;
}

export interface ExperienceData {
  _id: string;
  role: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  techUsed: string[];
  proofLinks: { label: string; url: string }[];
  featured?: boolean;
}

export interface JourneyData {
  _id: string;
  year: string;
  title: string;
  desc: string;
  featured?: boolean;
}

export interface NoteData {
  _id: string;
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  content?: string;
  featured?: boolean;
}

export const fetchHealthStatus = async (): Promise<HealthStatus> => {
  const response = await fetch(`${API_BASE_URL}/health`);
  if (!response.ok) {
    throw new Error("Failed to fetch API health status");
  }
  return response.json();
};

export const fetchProjects = async (): Promise<ProjectData[]> => {
  const response = await fetch(`${API_BASE_URL}/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const fetchProjectById = async (id: string): Promise<ProjectData> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }
  return response.json();
};

export const fetchExperiences = async (): Promise<ExperienceData[]> => {
  const response = await fetch(`${API_BASE_URL}/experiences`);
  if (!response.ok) {
    throw new Error("Failed to fetch experiences");
  }
  return response.json();
};

export const fetchJourneys = async (): Promise<JourneyData[]> => {
  const response = await fetch(`${API_BASE_URL}/journey`);
  if (!response.ok) {
    throw new Error("Failed to fetch journey data");
  }
  return response.json();
};

export const fetchNotes = async (): Promise<NoteData[]> => {
  const response = await fetch(`${API_BASE_URL}/notes`);
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }
  return response.json();
};

export const fetchNoteById = async (id: string): Promise<NoteData> => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch note");
  }
  return response.json();
};

export interface ContactMessageData {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export const submitContactMessage = async (data: { name: string; email: string; message: string }): Promise<{ status: string; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to send message");
  }
  return response.json();
};

// Helper for authenticated requests
const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {})
  };
};

// Admin Google Auth Login
export const loginWithGoogle = async (credential: string): Promise<{ status: string; token: string; admin: { name: string; email: string; picture: string } }> => {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ credential }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Failed to log in with Google");
  }
  return response.json();
};

// Contact Management
export const fetchContactMessages = async (): Promise<ContactMessageData[]> => {
  const response = await fetch(`${API_BASE_URL}/contact`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to fetch contact messages");
  }
  return response.json();
};

export const deleteContactMessage = async (id: string): Promise<{ status: string; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/contact/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete contact message");
  }
  return response.json();
};

// Project Management
export const createProject = async (data: Omit<ProjectData, "_id">): Promise<ProjectData> => {
  const response = await fetch(`${API_BASE_URL}/projects`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create project");
  }
  return response.json();
};

export const updateProject = async (id: string, data: Partial<ProjectData>): Promise<ProjectData> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update project");
  }
  return response.json();
};

export const deleteProject = async (id: string): Promise<{ status: string; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
  return response.json();
};

// Note Management
export const createNote = async (data: Omit<NoteData, "_id">): Promise<NoteData> => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create note");
  }
  return response.json();
};

export const updateNote = async (id: string, data: Partial<NoteData>): Promise<NoteData> => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update note");
  }
  return response.json();
};

export const deleteNote = async (id: string): Promise<{ status: string; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete note");
  }
  return response.json();
};

// Experience Management
export const createExperience = async (data: Omit<ExperienceData, "_id">): Promise<ExperienceData> => {
  const response = await fetch(`${API_BASE_URL}/experiences`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create experience");
  }
  return response.json();
};

export const updateExperience = async (id: string, data: Partial<ExperienceData>): Promise<ExperienceData> => {
  const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update experience");
  }
  return response.json();
};

export const deleteExperience = async (id: string): Promise<{ status: string; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/experiences/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete experience");
  }
  return response.json();
};

// Journey Management
export const createJourney = async (data: Omit<JourneyData, "_id">): Promise<JourneyData> => {
  const response = await fetch(`${API_BASE_URL}/journey`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create journey entry");
  }
  return response.json();
};

export const updateJourney = async (id: string, data: Partial<JourneyData>): Promise<JourneyData> => {
  const response = await fetch(`${API_BASE_URL}/journey/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to update journey entry");
  }
  return response.json();
};

export const deleteJourney = async (id: string): Promise<{ status: string; message: string }> => {
  const response = await fetch(`${API_BASE_URL}/journey/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error("Failed to delete journey entry");
  }
  return response.json();
};