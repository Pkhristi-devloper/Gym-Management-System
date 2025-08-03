import mongoose from "mongoose";

const gymSchema = new mongoose.Schema(
  {
    email: {
      required: true,
      type: String,
    },
    userName: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    gymName: {
      type: String,
      required: true,
    },
    profileImg:{
        type:String,
        required:true
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

let GymModel = mongoose.model("GymModel", gymSchema);
export default GymModel;
