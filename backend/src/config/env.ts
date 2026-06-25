import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongodbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  adminEmail: process.env.ADMIN_EMAIL || "ayushshakya.dev@gmail.com",
  jwtSecret: process.env.JWT_SECRET || "default-super-secret-key",
};
