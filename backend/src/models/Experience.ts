import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  role: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  techUsed: string[];
  proofLinks: { label: string; url: string }[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema: Schema = new Schema(
  {
    role: { type: String, required: true },
    organization: { type: String, required: true },
    duration: { type: String, required: true },
    responsibilities: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    techUsed: { type: [String], default: [] },
    proofLinks: [
      {
        label: { type: String },
        url: { type: String },
      },
    ],
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Experience = mongoose.model<IExperience>("Experience", ExperienceSchema);
