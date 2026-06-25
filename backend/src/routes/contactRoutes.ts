import { Router } from "express";
import { submitContact, getContactMessages, deleteContactMessage } from "../controllers/contactController.js";
import { requireAdmin } from "../middlewares/auth.js";

const router = Router();

router.route("/contact")
  .post(submitContact)
  .get(requireAdmin, getContactMessages);

router.route("/contact/:id")
  .delete(requireAdmin, deleteContactMessage);

export default router;