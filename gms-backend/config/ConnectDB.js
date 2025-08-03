import mongoose from "mongoose";

let connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB Connection Error");
    console.log(error);
  }
};

export default connectDB;
