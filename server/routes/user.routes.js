import express from "express";

import { updateProfile } from "../controllers/user.controllers.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.put("/update-profile", protectedRoute, updateProfile);

export default router;
