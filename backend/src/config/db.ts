import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);
    console.log(`[database]: MongoDB connected successfully to: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[database error]: ${(error as Error).message}`);
    process.exit(1);
  }
};
