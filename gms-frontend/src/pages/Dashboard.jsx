import MenuIcon from "@mui/icons-material/Menu";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import GroupsIcon from "@mui/icons-material/Groups";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const [accordianDashboard, setAccordianDashboard] = useState(false);
  let ref = useRef();
  let navigate = useNavigate();
  const handleOnClick = (item) => {
    sessionStorage.setItem("func", item);
  };
  useEffect(() => {
    let clickedOutside = (e) => {
      if (
        accordianDashboard &&
        ref.current &&
        !ref.current.contains(e.target)
      ) {
        setAccordianDashboard(false);
      }
    };
    document.addEventListener("mousedown", clickedOutside);
    return () => {
      document.removeEventListener("mousedown", clickedOutside);
    };
  }, [accordianDashboard]);
  return (
    <div className="w-[75vw] p-5 h-[100vh] bg-gray-100 flex flex-col gap-[10px] justify-between">
      <div className="flex w-full justify-between items-center bg-slate-800 p-2 px-4 rounded-lg text-white relative">
        <MenuIcon
          sx={{ cursor: "pointer" }}
          onClick={() => setAccordianDashboard((prev) => !prev)}
        />
        <div>
          <img
            src="https://i.pinimg.com/236x/73/11/22/731122abd113d952084e27284e80ef5e.jpg"
            alt=""
            className="w-[40px] h-[40px] rounded-full object-cover object-center"
          />
        </div>
        {accordianDashboard && (
          <div
            ref={ref}
            className="bg-slate-800 text-white absolute top-[110%] left-0 p-[20px] text-xl rounded-lg"
          >
            <span>Hii Welcome to our Gym Management System.</span> <br />
            <span>Feel free to ask any queries.</span>
          </div>
        )}
      </div>
      <div className="container w-full flex gap-[20px] justify-around flex-wrap my-[20px] overflow-y-auto">
        <div
          className="card my-[20px] w-[30%] h-fit "
          onClick={() => {
            navigate("/members");
            handleOnClick("Members");
          }}
        >
          <div className="upper h-[15px] w-full rounded-t-xl bg-gradient-to-r via-purple-500 from-violet-500 to-pink-500"></div>
          <div className="border-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border-t-0 border-gray-200 rounded-b-lg bg-white w-full h-fit p-3 flex flex-col items-center py-[25px] justify-center gap-[5px]">
            <GroupsIcon sx={{ color: "green", fontSize: "50px" }} />
            <p className="text-2xl font-mono">Joined Members</p>
          </div>
        </div>
        <div
          className="card my-[20px] w-[30%] h-fit "
          onClick={() => {
            navigate("/specific/monthly");
            handleOnClick("Monthly");
          }}
        >
          <div className="upper h-[15px] w-full rounded-t-xl bg-gradient-to-r via-purple-500 from-violet-500 to-pink-500"></div>
          <div className="border-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border-t-0 border-gray-200 rounded-b-lg bg-white w-full h-fit p-3 flex flex-col items-center py-[25px] justify-center gap-[5px]">
            <SignalCellularAltIcon sx={{ color: "purple", fontSize: "50px" }} />
            <p className="text-2xl font-mono">Monthly Joined</p>
          </div>
        </div>
        <div
          className="card my-[20px] w-[30%] h-fit "
          onClick={() => {
            navigate("/specific/expire-in-3-days");
            handleOnClick("ExpireIn3Days");
          }}
        >
          <div className="upper h-[15px] w-full rounded-t-xl bg-gradient-to-r via-purple-500 from-violet-500 to-pink-500"></div>
          <div className="border-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border-t-0 border-gray-200 rounded-b-lg bg-white w-full h-fit p-3 flex flex-col items-center py-[25px] justify-center gap-[5px]">
            <AccessAlarmIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl font-mono">Expiring Within 3 Days</p>
          </div>
        </div>
        <div
          className="card my-[20px] w-[30%] h-fit "
          onClick={() => {
            navigate("/specific/expire-in-4-7-days");
            handleOnClick("ExpireIn4To7Days");
          }}
        >
          <div className="upper h-[15px] w-full rounded-t-xl bg-gradient-to-r via-purple-500 from-violet-500 to-pink-500"></div>
          <div className="border-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border-t-0 border-gray-200 rounded-b-lg bg-white w-full h-fit p-3 flex flex-col items-center py-[25px] justify-center gap-[5px]">
            <AccessAlarmIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-xl font-mono">Expiring Within 4-7 Days</p>
          </div>
        </div>
        <div
          className="card my-[20px] w-[30%] h-fit "
          onClick={() => {
            navigate("/specific/expired");
            handleOnClick("Expired");
          }}
        >
          <div className="upper h-[15px] w-full rounded-t-xl bg-gradient-to-r via-purple-500 from-violet-500 to-pink-500"></div>
          <div className="border-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border-t-0 border-gray-200 rounded-b-lg bg-white w-full h-fit p-3 flex flex-col items-center py-[25px] justify-center gap-[5px]">
            <ErrorIcon sx={{ color: "red", fontSize: "50px" }} />
            <p className="text-2xl font-mono">Expired</p>
          </div>
        </div>
        <div
          className="card my-[20px] w-[30%] h-fit "
          onClick={() => {
            navigate("/specific/inactive");
            handleOnClick("Inactive");
          }}
        >
          <div className="upper h-[15px] w-full rounded-t-xl bg-gradient-to-r via-purple-500 from-violet-500 to-pink-500"></div>
          <div className="border-2 hover:bg-slate-800 hover:text-white transition-all cursor-pointer border-t-0 border-gray-200 rounded-b-lg bg-white w-full h-fit p-3 flex flex-col items-center py-[25px] justify-center gap-[5px]">
            <ReportIcon sx={{ color: "crimson", fontSize: "50px" }} />
            <p className="text-2xl font-mono">Inactive</p>
          </div>
        </div>
      </div>
      <div className="bg-black text-white min-w-[75%] w-fit text-xl px-[20px] py-[15px] rounded-lg font-semibold">
        Contact Developer for any Technical Error at +911234567890
      </div>
    </div>
  );
};

export default Dashboard;
