import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

// Initialize the Google OAuth2 client. If no Client ID is provided in dev,
// we will output warnings, but we still construct it.
const client = new OAuth2Client(config.googleClientId);

// @desc    Verify Google ID Token and generate session JWT
// @route   POST /api/auth/google
// @access  Public
export const loginWithGoogle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      res.status(400).json({ status: "error", message: "Google credential ID token is required" });
      return;
    }

    if (!config.googleClientId) {
      console.error("[auth]: GOOGLE_CLIENT_ID is not configured in backend .env");
      res.status(500).json({ 
        status: "error", 
        message: "Google Authentication is not configured on this server. Please check environment variables." 
      });
      return;
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      res.status(400).json({ status: "error", message: "Invalid token payload received from Google" });
      return;
    }

    // Authorize only the admin email
    if (payload.email !== config.adminEmail) {
      console.warn(`[auth]: Unauthorized login attempt by ${payload.email}`);
      res.status(403).json({ 
        status: "error", 
        message: "Unauthorized. This dashboard is restricted to the site owner." 
      });
      return;
    }

    // Create admin session token
    const token = jwt.sign(
      { email: payload.email, name: payload.name },
      config.jwtSecret,
      { expiresIn: "24h" }
    );

    res.json({
      status: "ok",
      token,
      admin: {
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      },
    });
  } catch (error) {
    console.error("[auth error]: Token verification failed:", (error as Error).message);
    res.status(401).json({ status: "error", message: "Google login verification failed. Invalid token." });
  }
};
