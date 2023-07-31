import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    userProfile: { type: Object },
    password: { type: String, required: true },
    followers: { type: Array, default: [] },
    following: { type: Array, default: [] },
    verified: { type: Boolean, default: false },
    isVip: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    notification: { type: Array, default: [] },
    visitors: { type: Array, default: [] },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
