import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/ConnectDB.js";
import gymRoutes from "./Routes/gym.routes.js";
import membershipRouter from "./Routes/membership.routes.js";
import memberRouter from "./Routes/member.routes.js";
let app = express();
app.use(
  cors({
    origin: "https://gym-management-system-frontend-js4m.onrender.com",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", gymRoutes);
app.use("/api/plans", membershipRouter);
app.use("/api/members", memberRouter);

let PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send({ message: "Server Started" });
});

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
  connectDB();
});
