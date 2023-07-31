import express from "express";
import {
  CommentsOnPost,
  createPost,
  getAllPosts,
  getPostLikes,
  getUserPost,
  likePost,
} from "../controllers/Post.js";

const router = express.Router();

router.get("/", getAllPosts);
router.post("/new", createPost);
router.patch("/:postId/:userId/like", likePost);
router.patch("/:postId/:userId/comment", CommentsOnPost);
router.get("/like/:postId/all", getPostLikes);
router.get("/:userId/user", getUserPost);

export default router;
