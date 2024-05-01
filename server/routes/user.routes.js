import express from "express";

import {
  updateProfile,
  follow,
  unfollow,
  userProfile,
  suggested,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.put("/update-profile", updateProfile);
router.post("/follow/:id", follow);
router.post("/unfollow/:id", unfollow);
router.get("/profile/:username", userProfile);
router.get("/suggested", suggested);

export default router;
