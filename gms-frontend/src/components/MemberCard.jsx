/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MemberCard = ({ item }) => {
  return (
    <Link
      to={`/member/${item?._id}`}
      className="w-[300px] h-[240px] cursor-pointer hover:bg-gradient-to-r from-indigo-500 to-pink-500 via-purple-500 bg-white border-2 border-gray-300 hover:text-white text-black rounded-xl flex flex-col items-center justify-center"
    >
      <div className="w-[100px] h-[100px] rounded-full border-2 border-white p-[2px] relative">
        <div
          className={`h-[20px] w-[20px] ${
            item?.status === "Active" ? "bg-green-500" : "bg-red-500"
          } absolute rounded-full top-0 left-[10px]`}
        ></div>
        <img
          src={
            item?.profileImg ||
            "https://static.vecteezy.com/system/resources/previews/017/504/043/non_2x/bodybuilding-emblem-and-gym-logo-design-template-vector.jpg"
          }
          alt="profile image"
          className="w-full h-full object-cover bg-cover rounded-full"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-[0px] mt-[10px]">
        <h3 className="font-mono text-xl font-semibold">
          {item?.name || "Gym user"}
        </h3>
        <h3 className="font-mono text-xl font-medium">
          {"+91 " + item?.mobileno}
        </h3>
        <h3 className="font-mono text-lg font-medium">
          {"Next Bill Date : " +
            item?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
        </h3>
      </div>
    </Link>
  );
};

export default MemberCard;
