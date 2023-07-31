import CommentsModal from "../models/CommentsModel.js";
import NotificationModel from "../models/NotificationModel.js";
import PostModel from "../models/PostModel.js";
import UserModel from "../models/UserMode.js";
import cloudinary from "../utils/cloudinary.js";

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error({ error: error.message });
    return res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { userId, body, postImage } = req.body;
    const user = await UserModel.findById(userId);
    const uploadRes = await cloudinary.uploader.upload(postImage, {
      upload_preset: "hotles_profile",
    });
    const post = new PostModel({
      userId,
      name: user.name,
      username: user.username,
      userProfile: user.userProfile,
      postImage: uploadRes,
      vip: user.isVip,
      verified: user.verified,
      body: body,
    });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error editing profile:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);
    const postUserId = post?.userId;
    const postUser = await UserModel.findById(postUserId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      const notify = new NotificationModel({
        userId: postUserId,
        userProfile: user.userProfile,
        body: `${user.name} liked your post`,
      });
      const newAlert = await notify.save();
      await postUser.updateOne({ $push: { notification: newAlert } });
      res.status(200).json("Post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    console.error("Error editing profile:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const CommentsOnPost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    const user = await UserModel.findById(userId);
    const post = await PostModel.findById(postId);
    const postUserId = post?.userId;
    const postUser = await UserModel.findById(postUserId);
    const comments = new CommentsModal({
      name: user.name,
      username: user.username,
      userProfile: user.userProfile,
      body: body,
    });
    const newcomments = await comments.save();
    const notify = new NotificationModel({
      userId: postUserId,
      userProfile: user.userProfile,
      body: `${user.name} commented on your post`,
    });
    const newAlert = await notify.save();
    await postUser.updateOne({ $push: { notification: newAlert } });
    await post.updateOne({ $push: { comments: newcomments } });
    res.status(201).json(newcomments);
  } catch (error) {
    console.error("Error editing profile:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getPostLikes = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await PostModel.findById(postId);
    const plikes = post.likes;
    res.status(200).json(plikes);
  } catch (error) {
    console.error("Error editing profile:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await PostModel.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error editing profile:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
