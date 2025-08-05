import { useEffect, useState } from "react";
import Popup from "./Popup";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import { serverURL } from "../main";
// gym-management
const Registration = () => {
  useEffect(()=>{
      localStorage.clear()
    },[])
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [inputField, setInputField] = useState({
    gymName: "",
    userName: "",
    email: "",
    password: "",
    profileImg:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gym-fitness-instagram-profile-photo-logo-design-template-4250d240b809171646df440d2a18af44_screen.jpg?ts=1600061299",
  });
  let handleClose = () => {
    setShowForgotPassword((prev) => !prev);
  };
  let handleChange = async (key, value) => {
    setInputField({ ...inputField, [key]: value });
    // console.log(inputField);
  };
  let uploadImage = async (e) => {
    setLoading(true);
    let files = e.target.files;
    let data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "gym-management");
    try {
      let response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnkdsknk0/image/upload",
        data
      );
      // console.log(response);
      let imgURL = response.data.url;
      setInputField({ ...inputField, ["profileImg"]: imgURL });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  let handleRegistration = async () => {
    try {
      let res = await axios.post(
        serverURL + "/api/auth/register",
        inputField,
        { withCredentials: true }
      );
      console.log(res.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="registration bg-white/25 w-[90%] md:w-[40%] flex items-center justify-start gap-[40px] rounded-2xl flex-col p-[20px] h-[400px] overflow-y-auto ">
      <ToastContainer />
      <div className="text-2xl font-bold text-white mt-[20px]">
        Register Your Gym
      </div>
      <input
        type="text"
        placeholder="Enter Gym Name"
        className="bg-white w-[80%] p-2 text-lg rounded-md outline-none font-medium"
        value={inputField.gymName}
        onChange={(e) => handleChange("gymName", e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Username"
        className="bg-white w-[80%] p-2 text-lg rounded-md outline-none font-medium"
        value={inputField.userName}
        onChange={(e) => handleChange("userName", e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Email"
        className="bg-white w-[80%] p-2 text-lg rounded-md outline-none font-medium"
        value={inputField.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        className="bg-white w-[80%] p-2 text-lg rounded-md outline-none font-medium"
        value={inputField.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <input
        type="file"
        className="bg-[#dadadac2] p-2 text-lg rounded-md  font-medium cursor-pointer"
        onChange={(e) => {
          uploadImage(e);
        }}
      />
      <div className="w-[80%] max-h-[300px] h-fit bg-white overflow-clip rounded-lg gap-[2px] flex flex-col">
        {loading && (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="secondary" />
          </Stack>
        )}
        <img
          src={inputField.profileImg}
          alt="Default Picture"
          className="w-full h-full rounded-lg object-cover bg-cover bg-center object-center"
        />
      </div>
      <button
        className="bg-slate-800 w-[80%] text-2xl font-semibold text-white py-2 border-[2px] border-white rounded-xl cursor-pointer hover:bg-white hover:text-black transition-all"
        onClick={() => handleRegistration()}
      >
        Register
      </button>
      <button
        className="bg-slate-800 w-[80%] text-2xl font-semibold text-white py-2 border-[2px] border-white rounded-xl cursor-pointer mb-4 hover:bg-white hover:text-black transition-all"
        onClick={() => handleClose()}
      >
        Forgot your Password
      </button>
      {showForgotPassword && (
        <Popup
          content={<ForgotPassword />}
          handleClose={handleClose}
          header={"Forgot Password"}
        />
      )}
    </div>
  );
};

export default Registration;
