import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  changeStatus,
  expiredMembers,
  expireIn4to7Days,
  expireInThreeDays,
  getAllMembers,
  getMemberDetails,
  inActiveMembers,
  membershipPlan,
  monthlyMembers,
  registerMember,
  searchUser,
} from "../controllers/member.controller.js";

let memberRouter = express.Router();

memberRouter.get("/all-members", isAuth, getAllMembers);
memberRouter.post("/register-member", isAuth, registerMember);
memberRouter.get("/searched-members", isAuth, searchUser);
memberRouter.get("/monthly-members", isAuth, monthlyMembers);
memberRouter.get("/expiring-3-days", isAuth, expireInThreeDays);
memberRouter.get("/expiring-4-to-7-days", isAuth, expireIn4to7Days);
memberRouter.get("/expired", isAuth, expiredMembers);
memberRouter.get("/inactive", isAuth, inActiveMembers);

memberRouter.get("/get-member/:id",isAuth,getMemberDetails)
memberRouter.post("/change-status/:id",isAuth,changeStatus)
memberRouter.put("/update-member-plan/:id",isAuth,membershipPlan)
export default memberRouter;
