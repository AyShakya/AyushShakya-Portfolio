import { Request, Response, NextFunction } from "express";
import { Note } from "../models/Note.js";

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
// @access  Public
export const getNoteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      res.status(404).json({ status: "error", message: "Note not found" });
      return;
    }
    res.json(note);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a note
// @route   POST /api/notes
// @access  Private (To be secured later)
export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private (To be secured later)
export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNote) {
      res.status(404).json({ status: "error", message: "Note not found" });
      return;
    }
    res.json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private (To be secured later)
export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ status: "error", message: "Note not found" });
      return;
    }
    res.json({ status: "ok", message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
