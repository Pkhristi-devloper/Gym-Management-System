import express from "express";
import {
  checkotp,
  login,
  logout,
  register,
  resetPassword,
  sendOTP,
} from "../controllers/gym.controller.js";

let gymRoutes = express.Router();

gymRoutes.post("/register", register);
gymRoutes.post("/login", login);
gymRoutes.post("/reset-password/sendotp", sendOTP);
gymRoutes.post("/reset-password/checkotp", checkotp);
gymRoutes.post("/reset-password", resetPassword);
gymRoutes.get("/logout",logout)

export default gymRoutes;
