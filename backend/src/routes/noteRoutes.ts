import { Router } from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.route("/notes")
  .get(getAllNotes)
  .post(requireAdmin, createNote);

router.route("/notes/:id")
  .get(getNoteById)
  .put(requireAdmin, updateNote)
  .delete(requireAdmin, deleteNote);

export default router;
