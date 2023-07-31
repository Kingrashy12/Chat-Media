import NotificationModel from "../models/NotificationModel.js";
import UserModel from "../models/UserMode.js";
import VisitorsModel from "../models/VsitorsModel.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllUser = async (reqq, res) => {
  try {
    const users = await UserModel.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username, visitorId } = req.params;
    const user = await UserModel.findOne({ username: username });
    if (!user) return res.status(404).json("User not found");

    if (!user.visitors.includes(visitorId)) {
      await user.updateOne({ $push: { visitors: visitorId } });
    } else {
      await user.updateOne({ $pull: { visitors: visitorId } });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await UserModel.findById(userId).select(
      "-password -notification"
    );
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const getLoggedUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UserModel.findOne({ username: username });
    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user);
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const editProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { userProfile } = req.body;

    // // Check if userProfile is provided before attempting to upload
    if (!userProfile) {
      return res.status(400).json({ message: "Profile image not provided" });
    }

    // Upload the profile image to Cloudinary
    const uploadRes = await cloudinary.uploader.upload(userProfile, {
      upload_preset: "hotles_profile",
    });

    // Prepare the update object
    const update = {
      userProfile: uploadRes,
    };

    // Update the user's profile in the database
    const user = await UserModel.findByIdAndUpdate(userId, update, {
      new: true,
    });
    if (!user) return res.status(404).json("User not found to update");

    res.status(200).json({ user, message: "Profile edited successfully" });
  } catch (error) {
    console.error("Error editing profile:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// export const editUserProfile = async (req, res) => {
//   try {
//     const { userId, userProfile } = req.params;
//     if (userProfile) {
//       const updatedProfile = {
//         userProfile: userProfile,
//       };
//       const user = await UserModel.findByIdAndUpdate(userId, updatedProfile, {
//         new: true,
//       });
//       res.status(200).json({ user, message: "Profile edited successfully" });
//     } else {
//       return res.status(403).json("Image is required");
//     }
//   } catch (error) {
//     console.log({ error: error.message });
//     return res.status(500).json({ error: error.message });
//   }
// };

export const followUser = async (req, res) => {
  try {
    const { ownId, followId } = req.params;
    if (ownId === followId) return res.status(403).json("Action Forbidden");
    const reqUser = await UserModel.findById(followId);
    const followUser = await UserModel.findById(ownId);
    if (!followUser.followers.includes(followId)) {
      await followUser.updateOne({ $push: { followers: followId } });
      await reqUser.updateOne({ $push: { following: { ownId } } });
      const notify = new NotificationModel({
        userProfile: followUser.userProfile,
        body: `${followUser.name} Followed you`,
      });
      const newAlert = notify.save();
      await followUser.updateOne({ $push: { notification: newAlert } });
      res.status(200).json(`You Followed ${followUser.name}`);
    } else {
      await followUser.updateOne({ $pull: { followers: followId } });
      await reqUser.updateOne({ $pull: { following: { ownId } } });
      const notify = new NotificationModel({
        userProfile: followUser.userProfile,
        body: `${followUser.name} Unfollowed you`,
      });
      const newAlert = notify.save();
      await followUser.updateOne({ $push: { notification: newAlert } });
      res.status(200).json(`You Unfollowed ${followUser.name}`);
    }
  } catch (error) {
    console.log({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};
