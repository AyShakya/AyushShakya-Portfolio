import { Request, Response, NextFunction } from "express";
import { Experience } from "../models/Experience.js";

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
export const getAllExperiences = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });
    res.json(experiences);
  } catch (error) {
    next(error);
  }
};

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Private (To be secured later)
export const createExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const experience = new Experience(req.body);
    const savedExperience = await experience.save();
    res.status(201).json(savedExperience);
  } catch (error) {
    next(error);
  }
};

// @desc    Update an experience
// @route   PUT /api/experiences/:id
// @access  Private (To be secured later)
export const updateExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedExperience) {
      res.status(404).json({ status: "error", message: "Experience not found" });
      return;
    }
    res.json(updatedExperience);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experiences/:id
// @access  Private (To be secured later)
export const deleteExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) {
      res.status(404).json({ status: "error", message: "Experience not found" });
      return;
    }
    res.json({ status: "ok", message: "Experience deleted successfully" });
  } catch (error) {
    next(error);
  }
};
