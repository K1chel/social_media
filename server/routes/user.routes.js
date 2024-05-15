import express from "express";

import {
  updateProfile,
  follow,
  unfollow,
  userProfile,
  suggested,
  getUserById,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/profile/:username", userProfile);
router.get("/user/:id", getUserById);
router.get("/suggested", suggested);
router.put("/update-profile", updateProfile);
router.post("/follow/:id", follow);
router.post("/unfollow/:id", unfollow);

export default router;
