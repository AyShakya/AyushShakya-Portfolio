import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
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
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    tag: { type: String, required: true },
    desc: { type: String, required: true },
    problem: { type: String },
    architecture: { type: String },
    techStack: { type: [String], default: [] },
    challenges: { type: String },
    technicalDecisions: { type: String },
    lessonsLearned: { type: String },
    futureImprovements: { type: String },
    githubUrl: { type: String },
    liveDemoUrl: { type: String },
    metrics: { type: String },
    screenshots: { type: [String], default: [] },
    architectureDiagrams: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.model<IProject>("Project", ProjectSchema);
