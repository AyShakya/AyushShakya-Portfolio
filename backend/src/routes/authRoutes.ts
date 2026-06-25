import { Router } from "express";
import { loginWithGoogle } from "../controllers/authController.js";

const router = Router();

router.route("/auth/google")
  .post(loginWithGoogle);

export default router;
