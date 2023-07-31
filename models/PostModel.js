import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    userProfile: { type: Object },
    postImage: { type: Object },
    body: { type: String, required: true },
    likes: { type: Array, default: [] },
    comments: { type: Array, default: [] },
    vip: { type: Boolean, required: true },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Posts", PostSchema);

export default PostModel;
