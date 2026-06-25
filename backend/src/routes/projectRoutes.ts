import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.route("/projects")
  .get(getAllProjects)
  .post(requireAdmin, createProject);

router.route("/projects/:id")
  .get(getProjectById)
  .put(requireAdmin, updateProject)
  .delete(requireAdmin, deleteProject);

export default router;
