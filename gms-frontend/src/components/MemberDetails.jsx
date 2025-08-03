import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

const MemberDetails = () => {
  const [status, setStatus] = useState("Pending");
  const [renewStatus, setRenewStatus] = useState(false);
  let navigate = useNavigate()
  const handleChange = () => {
    setStatus(status === "Pending" ? "Active" : "Pending");
  };
  return (
    <div className="w-[75vw] p-5 h-[100vh] bg-gray-100 flex flex-col gap-[10px] items-center justify-start">
      <div className="w-full px-[20px]">
        <button className="bg-slate-800 text-white font-semibold text-xl px-[20px] py-[10px] flex gap-[5px] items-center justify-center rounded-xl border-2 border-white cursor-pointer hover:bg-gradient-to-r from-indigo-500 to-pink-500 via-purple-500 hover:text-black" onClick={()=>navigate(-1)}>
          <ArrowBackIcon />
          Go Back
        </button>
      </div>

      <div className="h-[85%] w-full flex justify-start items-center px-[20px] py-[10px] gap-[20px]">
        <div className="w-[40%] h-[100%] overflow-hidden">
          <img
            src="https://www.marcypro.com/cdn/shop/files/HOME_GYM_-_CATEGORY-min.jpg?v=1741777597&width=1500"
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="w-[45%] h-full flex flex-col gap-[10px] text-2xl font-semibold py-[20px] justify-center">
          <h1>Name : {"Priyanshu H."}</h1>
          <h1>Mobile : {"+91 - 6353242223"}</h1>
          <h1>Address : {"Bihar, India"}</h1>
          <h1>Joined Date : {"01-01-2025"}</h1>
          <h1>Next Bill Date : {"01-01-2025"}</h1>
          <h1>
            Status :{" "}
            <Switch
              checked={status === "Active"}
              onColor="#6366F1"
              onChange={() => handleChange()}
            />
          </h1>
          <button
            onClick={() => setRenewStatus((prev) => !prev)}
            className={`hover:bg-gradient-to-r  from-indigo-500 to-pink-500 via-purple-500 border-2 border-black py-[7px] w-[70%] hover:text-white rounded-lg bg-white text-black transition-all cursor-pointer ${
              renewStatus && status == "Active"
                ? "bg-gradient-to-r  from-indigo-500 to-pink-500 via-purple-500 text-white"
                : ""
            }`}
          >
            Renew
          </button>
          {renewStatus && status=="Active" && <div className="flex flex-col gap-[10px] font-semibold text-xl">
            Membership
            <select className="outline-none bg-gray-200 px-[10px] py-[5px] cursor-pointer border-2 border-gray-400 font-normal text-lg">
              <option className="bg-gray-200">1 Month Membership</option>
              <option className="bg-gray-200">2 Month Membership</option>
              <option className="bg-gray-200">3 Month Membership</option>
              <option className="bg-gray-200">4 Month Membership</option>
              <option className="bg-gray-200">6 Month Membership</option>
            </select>
            <button className="hover:bg-gradient-to-r  from-indigo-500 to-pink-500 via-purple-500 border-2 border-black py-[7px] w-[70%] hover:text-white rounded-lg bg-white text-black transition-all cursor-pointer mt-[10px]">
              Save
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
