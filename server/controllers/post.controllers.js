import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

export const create = async (req, res) => {
  try {
    let { imageSrc } = req.body;
    const { text } = req.body;
    const userId = req.user._id;

    const user = User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    if (!text && !imageSrc) {
      return res.status(400).json({ error: "Text or image is required" });
    }

    if (imageSrc) {
      const uploadedImage = await cloudinary.uploader.upload(imageSrc);
      imageSrc = uploadedImage.secure_url;
    }

    const newPost = new Post({
      postedBy: userId,
      text,
      imageSrc,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.log(`Error in create: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    console.log(`Error in getAll: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res
        .status(401)
        .json({ error: "Unauthorized to delete this post" });
    }

    if (post.imageSrc) {
      const imageId = post.imageSrc.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(imageId);
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(`Error in delete: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const edit = async (req, res) => {
  let { imageSrc } = req.body;
  const { text } = req.body;
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID." });
  }
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    if (post.postedBy.toString() !== userId.toString()) {
      return res.status(401).json({ error: "Unauthorized to edit this post" });
    }

    if (imageSrc) {
      if (post.imageSrc) {
        const originalImageId = post.imageSrc.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(originalImageId);
      }

      const uploadedImage = await cloudinary.uploader.upload(imageSrc);
      imageSrc = uploadedImage.secure_url;
    }

    await Post.findByIdAndUpdate(id, { text, imageSrc }, { new: true });

    res.json({ message: "Post updated successfully" });
  } catch (error) {
    console.log(`Error in edit: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const likeUnlike = async (req, res) => {
  const userId = req.user._id;
  const { id: postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Unlike
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.updateOne({ _id: userId }, { $pull: { likedPosts: postId } });

      const updatedLikes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedLikes);
    } else {
      // Like
      post.likes.push(userId);
      await User.updateOne({ _id: userId }, { $push: { likedPosts: postId } });
      await post.save();

      if (userId.toString() !== post.postedBy.toString()) {
        const notification = new Notification({
          from: userId,
          to: post.postedBy,
          type: "like",
        });
        await notification.save();
      }

      const updatedLikes = post.likes;
      res.status(200).json(updatedLikes);
    }
  } catch (error) {
    console.log(`Error in likeUnlike: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const saveUnsave = async (req, res) => {
  const userId = req.user._id;
  const { id: postId } = req.params;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isSaved = user.savedPosts.includes(postId);

    if (isSaved) {
      // Unsave
      await User.updateOne({ _id: userId }, { $pull: { savedPosts: postId } });
      await Post.updateOne({ _id: postId }, { $pull: { saves: userId } });

      const updatedSaves = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
      res.status(200).json(updatedSaves);
    } else {
      // Save
      post.saves.push(userId);
      await User.updateOne({ _id: userId }, { $push: { savedPosts: postId } });
      await post.save();

      if (userId.toString() !== post.postedBy.toString()) {
        const notification = new Notification({
          from: userId,
          to: post.postedBy,
          type: "save",
        });
        await notification.save();
      }

      const updatedSaves = post.likes;
      res.status(200).json(updatedSaves);
    }
  } catch (error) {
    console.log(`Error in saveUnsave: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const replyToPost = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { commentBy: userId, text };

    if (comment) {
      post.comments.push(comment);
      await post.save();

      if (userId.toString() !== post.postedBy.toString()) {
        const notification = new Notification({
          from: userId,
          to: post.postedBy,
          type: "comment",
        });

        await notification.save();
      }
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(`Error in replyToPost: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
