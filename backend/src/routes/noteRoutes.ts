import { Router } from "express";
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

const router = Router();

router.route("/notes")
  .get(getAllNotes)
  .post(createNote);

router.route("/notes/:id")
  .get(getNoteById)
  .put(updateNote)
  .delete(deleteNote);

export default router;
