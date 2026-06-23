import { Router } from "express";
import {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

const router = Router();

router.route("/experiences")
  .get(getAllExperiences)
  .post(createExperience);

router.route("/experiences/:id")
  .put(updateExperience)
  .delete(deleteExperience);

export default router;
