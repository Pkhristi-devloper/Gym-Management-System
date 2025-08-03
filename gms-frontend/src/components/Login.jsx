import { useState } from "react";
import axios from "axios";
import { serverURL } from "../main";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [loginField, setLoginField] = useState({ userName: "", password: "" });
  let navigate = useNavigate();
  let handleLogin = async () => {
    try {
      let result = await axios.post(serverURL + "/api/auth/login", loginField, {
        withCredentials: true,
      });

      console.log(result.data.user);
      localStorage.setItem("gymName", result.data.user.gymName);
      localStorage.setItem("profileImg", result.data.user.profileImg);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", result.data.token);
      navigate("/dashboard")
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  let handleChange = async (key, value) => {
    setLoginField({ ...loginField, [key]: value });
  };
  return (
    <div className="login bg-white/25 w-[90%] md:w-[40%] flex items-center justify-center gap-[40px] rounded-2xl flex-col p-[20px] h-fit">
      <div className="text-2xl font-bold text-white">Login</div>
      <input
        type="text"
        placeholder="Enter username"
        className="bg-white w-[80%] p-2 text-lg rounded-md outline-none font-medium"
        value={loginField.userName}
        onChange={(e) => handleChange("userName", e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password"
        className="bg-white w-[80%] p-2 text-lg rounded-md outline-none font-medium"
        value={loginField.password}
        onChange={(e) => handleChange("password", e.target.value)}
      />
      <button
        className="bg-slate-800 w-[80%] text-2xl font-semibold text-white py-2 border-[2px] border-white rounded-xl cursor-pointer mb-4 hover:bg-white hover:text-black transition-all"
        onClick={() => handleLogin()}
      >
        Login
      </button>
      <ToastContainer />
    </div>
  );
};

export default Login;
