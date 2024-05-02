import express from "express";

import {
  deleteNotification,
  getNotifications,
  deleteById,
} from "../controllers/notification.controllers.js";

const router = express.Router();

router.get("/", getNotifications);
router.delete("/", deleteNotification);
router.delete("/:id", deleteById);

export default router;
