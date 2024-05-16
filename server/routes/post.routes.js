import express from "express";

import {
  create,
  deleteById,
  edit,
  getAll,
  getById,
  likeUnlike,
  saveUnsave,
  replyToPost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.get("/get-all", getAll);
router.get("/post/:id", getById);
router.post("/create", create);
router.put("/edit/:id", edit);
router.delete("/delete/:id", deleteById);
router.put("/like-unlike/:id", likeUnlike);
router.post("/save-unsave/:id", saveUnsave);
router.post("/reply/:id", replyToPost);

export default router;
