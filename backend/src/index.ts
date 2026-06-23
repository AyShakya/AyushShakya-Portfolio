import express from "express";
import cors from "cors";
import { config } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { seedDatabase } from "./utils/seeder.js";
import apiRouter from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

// API Base Routes
app.use("/api", apiRouter);

// Error Handling Middleware
app.use(errorHandler);

// Connect to Database first, then listen
const startServer = async () => {
  await connectDB();
  await seedDatabase();
  app.listen(config.port, () => {
    console.log(`[server]: Server is running in ${config.nodeEnv} mode at http://localhost:${config.port}`);
  });
};

startServer();
