import mongoose, { Schema, Document } from "mongoose";

export interface IJourney extends Document {
  year: string;
  title: string;
  desc: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JourneySchema: Schema = new Schema(
  {
    year: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Journey = mongoose.model<IJourney>("Journey", JourneySchema);
