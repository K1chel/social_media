import { v2 as cloudinary } from "cloudinary";

import User from "../models/user.model.js";

export const updateProfile = async (req, res) => {
  let { avatar } = req.body;
  const { username, fullName, bio, links } = req.body;
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

    if (bio && bio.length > 250) {
      return res
        .status(400)
        .json({ error: "Bio cannot be more than 150 characters" });
    }

    user.username = username || user.username;
    user.fullName = fullName || user.fullName;
    user.bio = bio || user.bio;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.log(`Error in updateProfile: ${error.message}`);
    res.status(500).json({ message: "Server Error" });
  }
};
