import GymModel from "../Models/Gym.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const register = async (req, res) => {
  try {
    let { userName, email, password, gymName, profileImg } = req.body;
    let isExist = await GymModel.findOne({ userName });
    if (isExist) {
      return res.status(400).json({
        message: "Username already exist..!!",
      });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    let newGym = new GymModel({
      email,
      userName,
      password: hashedPassword,
      gymName,
      profileImg,
    });
    await newGym.save();
    return res
      .status(201)
      .json({ newGym, message: "New Member registered successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    let { userName, password } = req.body;
    let user = await GymModel.findOne({ userName });
    if (user && bcrypt.compare(password, user.password)) {
      let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.DEPLOY === "production",
        sameSite: "Lax",
      });

      return res.status(200).json({ user, token });
    } else {
      return res.status(400).json({ message: "Invalid Credentials..!!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Login error : " + error });
  }
};
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pr27081403@gmail.com",
    pass: process.env.PASSWORD,
  },
});
export const sendOTP = async (req, res) => {
  try {
    let { email } = req.body;
    let user = await GymModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist..!!" });
    }
    let buffer = crypto.randomBytes(4);
    let token = (buffer.readUInt32BE(0) % 900000) + 100000;

    // console.log(token);
    user.resetPasswordToken = token.toString();
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

    await user.save();
    // console.log(process.env.EMAIL_PASSWORD);
    // console.log(transporter.);
    let mailOptions = {
      from: "pr27081403@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `You have requested to reset password in Gym. Here is your OTP to reset your password. OTP : ${token}`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ err });
      } else {
        return res.status(200).json({ message: "OTP sent successfully" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Send OTP error : " + error });
  }
};

export const checkotp = async (req, res) => {
  try {
    let { email, otp } = req.body;
    let user = await GymModel.findOne({
      email,
      resetPasswordToken: otp,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "OTP is invalid or expired..!" });
    }
    return res.status(200).json({ message: "OTP is verified successfully..!" });
  } catch (error) {}
};

export const resetPassword = async (req, res) => {
  try {
    let { email, newPassword } = req.body;
    let user = await GymModel.findOne({ email });
    if (!user) {
      return res
        .status(500)
        .json({ message: "Some technical issue. Please try again later..!!" });
    }
    let hashedPassword = bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordExpires = undefined;
    user.resetPasswordToken = undefined;
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Reset password error : " + error });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.DEPLOY === "production",
        sameSite: "Lax",
      })
      .json({ message: "Logout successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Logout error..!" + error });
  }
};
