import { Router } from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = Router();

router.route("/projects")
  .get(getAllProjects)
  .post(createProject);

router.route("/projects/:id")
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);

export default router;
