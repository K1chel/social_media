import express from "express";

import {
  currentUser,
  login,
  logout,
  register,
} from "../controllers/auth.controllers.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current-user", protectedRoute, currentUser);

export default router;
