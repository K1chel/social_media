import express from "express";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import { connectDB } from "./lib/connectDB.js";

import "dotenv/config";
import "colors";

const PORT = process.env.PORT;

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Rotues

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`.cyan.underline.bold);
});
