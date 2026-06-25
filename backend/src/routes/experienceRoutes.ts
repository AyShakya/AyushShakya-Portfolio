import { Router } from "express";
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.route("/experiences")
  .get(getAllExperiences)
  .post(requireAdmin, createExperience);

router.route("/experiences/:id")
  .put(requireAdmin, updateExperience)
  .delete(requireAdmin, deleteExperience);

export default router;
