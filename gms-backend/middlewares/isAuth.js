import GymModel from "../Models/Gym.js";
import jwt from "jsonwebtoken";

let isAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "Toekn not found" });
    }
    let decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await GymModel.findById(decode.userId).select("-password");
    next();
  } catch (error) {
    return res.status(500).json({ message: "authentication error : " + error });
  }
};

export default isAuth;
