import mongoose from "mongoose";

const NotificationSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String },
    userProfile: { type: Object },
    body: { type: String, required: true },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model("Notifications", NotificationSchema);

export default NotificationModel;
