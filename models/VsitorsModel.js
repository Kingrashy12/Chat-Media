import mongoose from "mongoose";

const VisitorsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    userProfile: { type: Object },
    seen: { type: Boolean, default: false },
  },
  { timesamps: true }
);

const VisitorsModel = mongoose.model("Vistors", VisitorsSchema);

export default VisitorsModel;
