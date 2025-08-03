import mongoose from "mongoose";

let MembershipSchema = new mongoose.Schema(
  {
    months: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GymModel",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let MembershipModel = mongoose.model("MembershipModel", MembershipSchema);

export default MembershipModel;
