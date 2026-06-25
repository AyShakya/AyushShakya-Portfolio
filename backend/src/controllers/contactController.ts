import { Request, Response, NextFunction } from "express";
import { Contact } from "../models/Contact.js";

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ status: "error", message: "All fields are required: name, email, message" });
      return;
    }

    // Save message to MongoDB
    const contactMessage = new Contact({ name, email, message });
    await contactMessage.save();

    console.log("[contact]: New message saved to database from:", email);

    res.json({ status: "ok", message: "Message received successfully. I'll get back to you soon." });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin Only)
// @route   GET /api/contact
// @access  Private
export const getContactMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a contact message (Admin Only)
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteContactMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) {
      res.status(404).json({ status: "error", message: "Message not found" });
      return;
    }
    res.json({ status: "ok", message: "Message deleted successfully" });
  } catch (error) {
    next(error);
  }
};