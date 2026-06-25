import { Router } from "express";
import {
  getAllJourneys,
  createJourney,
  updateJourney,
  deleteJourney,
} from "../controllers/journeyController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.route("/journey")
  .get(getAllJourneys)
  .post(requireAdmin, createJourney);

router.route("/journey/:id")
  .put(requireAdmin, updateJourney)
  .delete(requireAdmin, deleteJourney);

export default router;
