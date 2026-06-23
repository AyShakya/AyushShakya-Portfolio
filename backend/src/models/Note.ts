import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  category: string;
  readTime: string;
  snippet: string;
  content?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema: Schema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    readTime: { type: String, required: true },
    snippet: { type: String, required: true },
    content: { type: String },
    featured: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Note = mongoose.model<INote>("Note", NoteSchema);
