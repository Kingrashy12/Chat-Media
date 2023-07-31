import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    userProfile: { type: Object },
    body: { type: String, required: true },
  },
  { timestamps: true }
);

const CommentsModal = mongoose.model("Comments", CommentSchema);

export default CommentsModal;
