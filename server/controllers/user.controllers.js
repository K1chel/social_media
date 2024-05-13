import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

const MAX_BIO_CHARACTERS = 200;

export const updateProfile = async (req, res) => {
  let { avatar } = req.body;
  const { username, fullName, bio, links, isPrivate } = req.body;
  const userId = req.user._id;
  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (avatar) {
      // If user has an avatar, delete it from cloudinary
      if (user.avatar) {
        await cloudinary.uploader.destroy(
          user.avatar.split("/").pop().split(".")[0]
        );
      }
      const uploadedImage = await cloudinary.uploader.upload(avatar);
      avatar = uploadedImage.secure_url;
    }

    if (links && Array.isArray(links)) {
      // Limit the number of links to 3
      if (links.length > 3) {
        return res
          .status(400)
          .json({ error: "You can add a maximum of 3 links" });
      }
      user.links = links;
    }

    if (bio && bio.length > MAX_BIO_CHARACTERS) {
      return res.status(400).json({
        error: `Bio cannot be more than ${MAX_BIO_CHARACTERS} characters`,
      });
    }

    user.username = username || user.username;
    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;
    user.isPrivate = isPrivate || user.isPrivate;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(`Error in updateProfile: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const follow = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === currentUser._id.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      return res
        .status(400)
        .json({ error: "You are already following this user" });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });

      const notification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToFollow._id,
      });

      await notification.save();

      res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log(`Error in follow: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const unfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const userToFollow = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === currentUser._id.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    if (!userToFollow || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });

      res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      return res.status(400).json({ error: "You are not following this user" });
    }
  } catch (error) {
    console.log(`Error in unfollow: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in userProfile: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};

export const suggested = async (req, res) => {
  try {
    const users = await User.aggregate([
      { $match: { _id: { $nin: [req.user._id, ...req.user.following] } } },
      { $sample: { size: 5 } },
    ]);

    res.status(200).json(users);
  } catch (error) {
    console.log(`Error in suggested: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
