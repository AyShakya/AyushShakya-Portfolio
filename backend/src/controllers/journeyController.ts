import { Request, Response, NextFunction } from "express";
import { Journey } from "../models/Journey.js";

// @desc    Get all journey entries
// @route   GET /api/journey
// @access  Public
export const getAllJourneys = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const journeys = await Journey.find().sort({ year: -1, createdAt: -1 });
    res.json(journeys);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a journey entry
// @route   POST /api/journey
// @access  Private (To be secured later)
export const createJourney = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const journey = new Journey(req.body);
    const savedJourney = await journey.save();
    res.status(201).json(savedJourney);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a journey entry
// @route   PUT /api/journey/:id
// @access  Private (To be secured later)
export const updateJourney = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updatedJourney = await Journey.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJourney) {
      res.status(404).json({ status: "error", message: "Journey entry not found" });
      return;
    }
    res.json(updatedJourney);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a journey entry
// @route   DELETE /api/journey/:id
// @access  Private (To be secured later)
export const deleteJourney = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedJourney = await Journey.findByIdAndDelete(req.params.id);
    if (!deletedJourney) {
      res.status(404).json({ status: "error", message: "Journey entry not found" });
      return;
    }
    res.json({ status: "ok", message: "Journey entry deleted successfully" });
  } catch (error) {
    next(error);
  }
};
