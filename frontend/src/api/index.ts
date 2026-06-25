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