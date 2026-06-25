import { Request, Response, NextFunction } from "express";

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

    // For now, log the message. In production, this would send an email or save to DB.
    console.log("[contact]: New message received", { name, email, message });

    res.json({ status: "ok", message: "Message received successfully. I'll get back to you soon." });
  } catch (error) {
    next(error);
  }
};