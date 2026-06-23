import { Router } from "express";
import {
  getAllJourneys,
  createJourney,
  updateJourney,
  deleteJourney,
} from "../controllers/journeyController.js";

const router = Router();

router.route("/journey")
  .get(getAllJourneys)
  .post(createJourney);

router.route("/journey/:id")
  .put(updateJourney)
  .delete(deleteJourney);

export default router;
