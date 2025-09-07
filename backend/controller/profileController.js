import User from "../models/User.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";

// Get user by ID
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password"); // password hide
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({message:"user is herer",user});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateUser= async (req, res) => {
  try {
    const { id } = req.params;
    const { summary, photo } = req.body;

    let profile = await Profile.findOne({ userId: id });
    if (profile) {
      if (summary) profile.summary = summary;
      if (photo) profile.photo = photo;
      await profile.save();
    } else {
      profile = await Profile.create({ userId: id, summary, photo });
    }

    res.json({ message: "Profile updated successfully", profile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
