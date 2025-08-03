import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MemberCard from "./MemberCard";

const GeneralUser = () => {
  const [heading, setheading] = useState(null);
  useEffect(() => {
    let item = sessionStorage.getItem("func");
    functionCall(item);
  });
  let functionCall = async (item) => {
    if (item === "Monthly") {
      setheading("Monthly joined members ");
    } else if (item === "ExpireIn3Days") {
      setheading("Expiring in 3 Days Members");
    } else if (item == "ExpireIn4To7Days") {
      setheading("Expiring in 4 to 7 Days Members");
    } else if (item == "Expired") {
      setheading("Expired Members");
    } else if (item == "Inactive") {
      setheading("Inactive members");
    }
  };
  return (
    <div className="w-[75vw] p-5 h-[100vh] bg-gray-100 flex flex-col gap-[10px] ">
      <div className="flex w-full justify-between items-center bg-slate-800 p-2 px-4 rounded-lg text-white relative">
        <Link
          to={"/dashboard"}
          className="border-2 border-white flex gap-[5px] px-[15px] cursor-pointer py-[7px] rounded-2xl hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black font-semibold transition-all"
        >
          <ArrowBackIcon />
          Back To Dashboard
        </Link>
      </div>
      <div className="text-xl font-semibold px-[20px] my-[5px] capitalize">
        {heading}
      </div>
      <div className="p-5 mt-[5px] grid grid-cols-3 gap-[20px] bg-gray-100 rounded-lg h-[75%] overflow-y-auto">
        <MemberCard />
        <MemberCard />
      </div>
    </div>
  );
};

export default GeneralUser;
