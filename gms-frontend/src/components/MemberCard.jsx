import { Link } from "react-router-dom";

const MemberCard = () => {
  return (
    <Link to={"/member/123"} className="w-[300px] h-[240px] cursor-pointer hover:bg-gradient-to-r from-indigo-500 to-pink-500 via-purple-500 bg-white border-2 border-gray-300 hover:text-white text-black rounded-xl flex flex-col items-center justify-center">
      <div className="w-[100px] h-[100px] rounded-full border-2 border-white p-[2px] relative">
        <div className="h-[20px] w-[20px] bg-green-400 absolute rounded-full top-0 left-[10px]"></div>
        <img
          src="https://static.vecteezy.com/system/resources/previews/017/504/043/non_2x/bodybuilding-emblem-and-gym-logo-design-template-vector.jpg"
          alt="profile image"
          className="w-full h-full object-cover bg-cover rounded-full"
        />
      </div>
      <div className="w-full flex flex-col items-center justify-center gap-[0px] mt-[10px]">
        <h3 className="font-mono text-xl font-semibold">Shubham Kumar</h3>
        <h3 className="font-mono text-xl font-medium">
          {"+91 " + "9078563412"}
        </h3>
        <h3 className="font-mono text-lg font-medium">
          {"Next Bill Date : " + "12-12-2021"}
        </h3>
      </div>
    </Link>
  );
};

export default MemberCard;
