import mongoose from "mongoose";

let memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileno: {
      type: String,
    },
    address: {
      type: String,
    },
    membership: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MembershipModel",
      required: true,
    },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GymModel",
      required: true,
    },
    profileImg: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Active"
    },
    lastPayment: {
      type: Date,
      default: new Date(),
    },
    nextBillDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

let MemberModel = mongoose.model("MemberModel", memberSchema);

export default MemberModel;
