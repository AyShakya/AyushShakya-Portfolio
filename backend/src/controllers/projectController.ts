import { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project.js";

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const featured = req.query.featured;
    const filter = featured !== undefined ? { featured: featured === "true" } : {};
    const projects = await Project.find(filter).sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single project by ID
// @route   GET /api/projects/:id
// @access  Public
export const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      res.status(404).json({ status: "error", message: "Project not found" });
      return;
    }
    res.json(project);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private (To be secured with auth later)
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private (To be secured with auth later)
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      res.status(404).json({ status: "error", message: "Project not found" });
      return;
    }
    res.json(updatedProject);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private (To be secured with auth later)
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      res.status(404).json({ status: "error", message: "Project not found" });
      return;
    }
    res.json({ status: "ok", message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
};
