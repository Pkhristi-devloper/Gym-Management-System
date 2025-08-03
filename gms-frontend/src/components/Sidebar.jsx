import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [greeting, setGreeting] = useState("");
  let location = useLocation()
  let navigate = useNavigate()
  const getGreeting = () => {
    let t = new Date().getHours();
    if (t < 12) {
      setGreeting("Good Morning 🌞");
    } else if (t >= 12 && t < 17) {
      setGreeting("Good Afternoon ☀️");
    } else if (t >= 17 && t <= 20) {
      setGreeting("Good Evening 🌕");
    } else {
      setGreeting("Good Night 🌙");
    }
  };
  let handleLogout = async () =>{
    localStorage.clear()
    navigate("/")
  }
  useEffect(() => {
    getGreeting();
  }, []);
  return (
    <div className="w-[90vw] md:w-[25vw] bg-black h-[100vh] text-white">
      <div className="w-full h-fit flex flex-col gap-[10px]">
        <h1 className="text-3xl w-full text-center font-semibold">
          {localStorage.getItem("gymName")}
        </h1>
        <div className="w-full h-fit items-center justify-start flex gap-[20px]">
          <div className="w-[100px] h-[100px] rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-slate-950">
            <img
              src={localStorage.getItem("profileImg")}
              alt=""
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className=" h-full flex flex-col gap-[5px]">
            <h2 className="text-2xl font-medium">{greeting}</h2>
            <h2 className="text-xl font-normal">Admin</h2>
          </span>
        </div>
        <div className="my-[20px] w-[80%] mx-auto h-[3px] border-0 bg-[#1c1b1b]" />
        <div className="w-full flex flex-col justify-start items-center gap-[20px]">
          <span className={`flex gap-[20px] px-[20px] py-[10px] w-[90%] bg-slate-800 rounded-lg items-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black hover:font-bold transition-all hover:px-[30px] font-semibold ${location.pathname == "/dashboard" && "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-bold" }`} onClick={()=>{
            navigate("/dashboard")
          }}>
            <HomeIcon />
            <h4 className="text-xl ">Dashboard</h4>
          </span>
          <span className={`flex gap-[20px] px-[20px] py-[10px] w-[90%] bg-slate-800 rounded-lg items-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black hover:font-bold transition-all hover:px-[30px] font-semibold ${location.pathname == "/members" && "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-black font-bold" }`} onClick={()=>navigate("/members")}>
            <GroupsIcon />
            <h4 className="text-xl ">Members</h4>
          </span>
          <span className="flex gap-[20px] px-[20px] py-[10px] w-[90%] bg-slate-800 rounded-lg items-center cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black hover:font-bold transition-all hover:px-[30px] font-semibold" onClick={()=> handleLogout()}>
            <LogoutIcon />
            <h4 className="text-xl ">Logout</h4>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
