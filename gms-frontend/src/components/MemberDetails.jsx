/* eslint-disable no-unused-vars */
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import { serverURL } from "../main";

const MemberDetails = () => {
  const [renewStatus, setRenewStatus] = useState(false);
  const [planName, setplanName] = useState("");
  const [membership, setMembership] = useState([]);
  const [member, setMember] = useState({});
  const [status, setStatus] = useState(member.status || "Pending");
  let navigate = useNavigate();
  let { id } = useParams();
  let fetchMembership = async () => {
    try {
      let result = await axios.get(serverURL + "/api/plans/get-membership", {
        withCredentials: true,
      });
      setMembership(result.data.membership);
      setplanName(result.data.membership[0]._id);
      // console.log(result.data.membership);
    } catch (error) {
      console.log(error);
    }
  };
  let fetchData = async () => {
    try {
      let response = await axios.get(
        serverURL + `/api/members/get-member/${id}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.member);
      setMember(response.data.member);
      setStatus(response.data.member.status);
    } catch (error) {
      console.error("Error fetching member details:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchMembership();
  }, [id]);
  useEffect(() => {
    setStatus(member.status);
  }, [status]);
  let isDateInPast = (date) => {
    if (!date) return false;
    const today = new Date();
    const nextBillDate = new Date(date);
    return nextBillDate < today;
  };
  const handleChange = async () => {
    const newStatus = status === "Pending" ? "Active" : "Pending";
    setStatus(newStatus);
    try {
      let response = await axios.post(
        serverURL + `/api/members/change-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      console.log("Status updated ", response.data);
      // setStatus(response.data.member.status);
      fetchData();
    } catch (error) {
      console.error("Error updating status ", error);
    }
  };
  let handleRenewSave = async () => {
    try {
      let response = await axios.put(
        serverURL + `/api/members/update-member-plan/${id}`,
        { membership: planName },
        { withCredentials: true }
      );
      console.log("Membership updated ", response.data);
      setMember(response.data.member);
    } catch (error) {
      console.log(error);
    }
  };
  let handleChangeMembership = (e) => {
    setplanName(e.target.value);
    console.log(planName);
  };
  return (
    <div className="w-[75vw] p-5 h-[100vh] bg-gray-100 flex flex-col gap-[10px] items-center justify-start">
      <div className="w-full px-[20px]">
        <button
          className="bg-slate-800 text-white font-semibold text-xl px-[20px] py-[10px] flex gap-[5px] items-center justify-center rounded-xl border-2 border-white cursor-pointer hover:bg-gradient-to-r from-indigo-500 to-pink-500 via-purple-500 hover:text-black"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon />
          Go Back
        </button>
      </div>

      <div className="h-[85%] w-full flex justify-start items-center px-[20px] py-[10px] gap-[20px]">
        <div className="w-[40%] h-[100%] overflow-hidden">
          <img
            src={
              member.profileImg ||
              "https://www.marcypro.com/cdn/shop/files/HOME_GYM_-_CATEGORY-min.jpg?v=1741777597&width=1500"
            }
            alt=""
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="w-[45%] h-full flex flex-col gap-[10px] text-2xl font-semibold py-[20px] justify-center">
          <h1>Name : {member?.name}</h1>
          <h1>Mobile : {member?.mobileno}</h1>
          <h1>Address : {member?.address}</h1>
          <h1>
            Joined Date :{" "}
            {member &&
              member.createdAt &&
              member.createdAt.slice(0, 10).split("-").reverse().join("-")}
          </h1>
          <h1>
            Next Bill Date :{" "}
            {member &&
              member.nextBillDate &&
              member.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
          </h1>
          <h1>
            Status :{" "}
            <Switch
              checked={status === "Active"}
              onColor="#6366F1"
              onChange={() => handleChange()}
            />
          </h1>
          {isDateInPast(member && member.nextBillDate) && (
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
          )}
          {renewStatus && status == "Active" && (
            <div className="flex flex-col gap-[10px] font-semibold text-xl">
              Membership
              <select
                className="outline-none bg-gray-200 px-[10px] py-[5px] cursor-pointer border-2 border-gray-400 font-normal text-lg"
                onChange={(e) => handleChangeMembership(e)}
                value={planName}
              >
                {membership.map((plan) => (
                  <option
                    key={plan._id}
                    value={plan._id}
                    className="bg-gray-200"
                  >
                    {plan.months} Month Membership
                  </option>
                ))}
              </select>
              <button
                className="hover:bg-gradient-to-r  from-indigo-500 to-pink-500 via-purple-500 border-2 border-black py-[7px] w-[70%] hover:text-white rounded-lg bg-white text-black transition-all cursor-pointer mt-[10px]"
                onClick={() => handleRenewSave()}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
