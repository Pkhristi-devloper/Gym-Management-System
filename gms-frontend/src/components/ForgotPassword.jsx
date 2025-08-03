import { useState } from "react";
import Loader from "./Loader";
import axios from "axios";
import { serverURL } from "../main";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [loader, setLoader] = useState(false);
  const [emailSubmit, setemailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });
  let getOTP = async () => {
    try {
      setLoader(true);
      let res = await axios.post(
        serverURL + "/api/auth/reset-password/sendotp",
        { email: inputField.email },
        { withCredentials: true }
      );
      setemailSubmit(true);
      console.log(res.data);
      toast.success(res.data.message);
      setLoader(false);
    } catch (error) {
      setLoader(false);
      toast.error("Some technical issue while sending OTP.");
      console.log(error);
    }
  };
  let validateOTP = async () => {
    try {
      setLoader(true);
      let result = await axios.post(
        serverURL + "/api/auth/reset-password/checkotp",
        { email: inputField.email, otp: inputField.otp }
      );

      toast.success(result.data.message);
      setOtpValidate(true);
    } catch (error) {
      setLoader(false);
      toast.error(
        error.response && error.response.data && error.response.data.message
      );
      console.log(error);
    }
  };
  let handleSubmit = () => {
    if (!emailSubmit) {
      // setemailSubmit(true);
      getOTP();
    } else if (emailSubmit && !otpValidate) {
      validateOTP();
    }
  };
  let handleChange = (key, value) => {
    setInputField({ ...inputField, [key]: value });
  };
  return (
    <div className=" p-[20px]">
      <div>
        <h1 className="text-xl font-normal mb-[10px]">Enter your email</h1>
        <input
          type="email"
          placeholder="Enter your Email"
          className="w-[80%] outline-none bg-gray-100 px-[20px] py-[10px] mb-[20px] border-2 border-gray-400 rounded-lg text-lg"
          value={inputField.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </div>
      {emailSubmit && (
        <div>
          <h1 className="text-xl font-normal mb-[10px]">Enter your OTP</h1>
          <input
            type="text"
            placeholder="Enter your OTP"
            className="w-[80%] outline-none bg-gray-100 px-[20px] py-[10px] mb-[20px] border-2 border-gray-400 rounded-lg text-lg"
            value={inputField.otp}
            onChange={(e) => setInputField("otp", e.target.value)}
          />
        </div>
      )}
      {otpValidate && (
        <div>
          <h1 className="text-xl font-normal mb-[10px]">
            Enter your New Password
          </h1>
          <input
            type="password"
            placeholder="Enter your New Password"
            className="w-[80%] outline-none bg-gray-100 px-[20px] py-[10px] mb-[20px] border-2 border-gray-400 rounded-lg text-lg"
            value={inputField.newPassword}
            onChange={(e) => handleChange("newPassword", e.target.value)}
          />
        </div>
      )}
      <button
        className="bg-slate-800 w-[80%] text-2xl font-semibold text-white py-2 border-[2px] border-white rounded-xl cursor-pointer hover:bg-[#d9d9d9] hover:text-black transition-all"
        onClick={() => handleSubmit()}
      >
        {!emailSubmit
          ? "Submit You Email"
          : !otpValidate
          ? "Submit Your OTP"
          : "Submit Your Password"}
      </button>
      {loader && <Loader />}
    </div>
  );
};

export default ForgotPassword;
