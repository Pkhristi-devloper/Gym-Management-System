/* eslint-disable no-unused-vars */
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import MemberCard from "../components/MemberCard";
import { useEffect, useState } from "react";
import Popup from "../components/Popup";
import MembershipPopup from "../components/MembershipPopup";
import AddMemberPopup from "../components/AddMemberPopup";
import axios from "axios";
import { serverURL } from "../main";
import { toast } from "react-toastify";

const Members = () => {
  const [showMembership, setShowMembership] = useState(false);
  const [skips, setSkips] = useState(0);
  const [addMember, setAddMember] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState(9);
  const [noOfPages, setNoOfPages] = useState(0);
  const [memberData, setMemberData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [searchShow, setSearchShow] = useState(false);
  useEffect(() => {
    getData(0, 9);
  }, []);
  let getData = async (skip, limits) => {
    try {
      let members = await axios.get(
        serverURL + `/api/members/all-members?skip=${skip}&limit=${limits}`,
        {
          withCredentials: true,
        }
      );
      // console.log(members);
      setMemberData(members.data.members);
      let data = members.data.totalMembers;
      setTotalData(data);
      let pages = Math.ceil(data / limit);
      setNoOfPages(pages);
      if (data === 0) {
        setStartFrom(-1);
        setEndTo(0);
      }
      if (data < 9) {
        setStartFrom(0);
        setEndTo(data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      let skipValue = (currPage - 1) * limit;
      let from = skipValue;
      let to = skipValue + limit;

      setCurrentPage(currPage);
      setSkips(skipValue);
      getData(skipValue, limit);
      setStartFrom(from);
      setEndTo(Math.min(to, totalData));
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPages) {
      let currPage = currentPage + 1;
      let skipValue = (currPage - 1) * limit;
      let from = skipValue;
      let to = skipValue + limit;

      setCurrentPage(currPage);
      setSkips(skipValue);
      getData(skipValue, limit);
      setStartFrom(from);
      setEndTo(Math.min(to, totalData));
    }
  };

  let handleAddMember = () => {
    setAddMember((prev) => !prev);
  };
  let handlePopup = () => {
    setShowMembership((prev) => !prev);
  };
  let handleSearch = async () => {
    if (searchData.trim() !== "") {
      setSearchShow(true);
      try {
        let result = await axios.get(
          serverURL + `/api/members/searched-members?searchItem=${searchData}`,
          { withCredentials: true }
        );
        setMemberData(result.data.members);
        setTotalData(result.data.totalMembers);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (searchShow) {
        window.location.reload();
      } else {
        toast.error("Please enter some value..!!");
      }
    }
  };
  return (
    <div className="w-[75vw] p-5 h-full">
      <Link to={"/dashboard"} className="font-semibold text-md">
        <ArrowBackIcon /> Back to Dashboard
      </Link>
      <div className="bg-slate-800 text-white px-[20px] py-2.5 flex justify-between rounded-lg items-center mt-[10px]">
        <button
          className="flex h-full items-center justify-center gap-[10px] text-[15px] border-2 border-white py-2 px-[20px] cursor-pointer hover:text-black hover:bg-white transition-all hover:font-bold  rounded-lg"
          onClick={() => handleAddMember()}
        >
          Add Member <FitnessCenterIcon sx={{ fontSize: "20px" }} />
        </button>
        <button
          className="flex h-full items-center justify-center gap-[10px] text-[15px] border-2 border-white py-2  cursor-pointer hover:text-black hover:bg-white transition-all hover:font-bold px-[20px] rounded-lg"
          onClick={() => handlePopup()}
        >
          Membership <AddIcon sx={{ fontSize: "20px" }} />
        </button>
      </div>
      <div className="w-[50%] mt-[10px] h-[8vh] flex gap-[5px]">
        <input
          className="w-full h-full outline-none border-2 border-gray-400 px-[20px] py-[10px] font-medium text-lg rounded-lg"
          type="text"
          placeholder="Search by Name or Mobile No."
          value={searchData}
          onChange={(e) => {
            setSearchData(e.target.value);
            handleSearch();
          }}
        />
        <SearchIcon
          sx={{
            fontSize: "25px",
            backgroundColor: "#1D293D",
            color: "white",
            height: "8vh",
            width: "8vh",
            padding: "10px",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          // onClick={()=>handleSearch()}
        />
      </div>
      <div className="flex w-full justify-between mt-[10px] ">
        <h3 className="font-semibold text-xl">Total Members</h3>
        <div className="flex gap-[10px] text-xl">
          <h3>
            {startFrom + 1} - {endTo} of {totalData} Members
          </h3>
          <div
            className={`w-[30px] h-[30px] border-2 border-gray-300 flex items-center justify-center p-[5px] cursor-pointer ${
              currentPage === 1
                ? "bg-gray-200 text-gray-600"
                : "hover:bg-gradient-to-r from-indigo-500 to-pink-500 via-purple-500 hover:font-bold"
            }`}
            onClick={() => {
              handlePrev();
            }}
          >
            <ArrowBackIosIcon
              sx={{
                fontSize: "20px",
                height: "fit-content",
                width: "fit-content",
              }}
            />
          </div>
          <div
            className={`w-[30px] h-[30px] border-2 border-gray-300 flex items-center justify-center p-[5px] cursor-pointer ${
              currentPage === noOfPages
                ? "bg-gray-200 text-gray-600"
                : "hover:bg-gradient-to-r from-indigo-500 to-pink-500 via-purple-500 hover:font-bold"
            }`}
            onClick={() => {
              handleNext();
            }}
          >
            <ArrowForwardIosIcon
              sx={{
                fontSize: "20px",
                height: "fit-content",
                width: "fit-content",
              }}
            />
          </div>
        </div>
      </div>
      <div className="p-5 mt-[10px] grid grid-cols-3 gap-[20px] bg-gray-100 rounded-lg h-[65%] overflow-y-auto">
        {memberData &&
          memberData.map((item, idx) => {
            return <MemberCard key={idx} item={item} />;
          })}
      </div>
      {showMembership && (
        <Popup
          handleClose={handlePopup}
          header={"Membership"}
          content={<MembershipPopup handleClose={handlePopup} />}
        />
      )}
      {addMember && (
        <Popup
          handleClose={handleAddMember}
          header={"Add a New Member"}
          content={<AddMemberPopup />}
        />
      )}
    </div>
  );
};

export default Members;
