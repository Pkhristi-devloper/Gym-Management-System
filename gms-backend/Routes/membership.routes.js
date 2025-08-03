import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { addMembership, getMembership } from "../controllers/membership.controller.js"
let membershipRouter = express.Router()

membershipRouter.post("/add-membership",isAuth, addMembership)
membershipRouter.get("/get-membership",isAuth,getMembership)

export default membershipRouter