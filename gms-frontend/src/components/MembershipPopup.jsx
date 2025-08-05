/* eslint-disable react/prop-types */
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useEffect, useState } from "react";
import { serverURL } from "../main";
import { toast } from "react-toastify";
const MembershipPopup = ({ handleClose }) => {
  const [inputField, setInputField] = useState({ months: "", price: "" });
  const [membership, setMembership] = useState([]);
  let handleChange = (key, value) => {
    setInputField({ ...inputField, [key]: value });
  };
  let fetchMembership = async () => {
    try {
      let result = await axios.get(serverURL + "/api/plans/get-membership", {
        withCredentials: true,
      });
      setMembership(result.data.membership);
      console.log(result.data.membership);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMembership();
  }, []);
  let addMembership = async () => {
    try {
      let result = await axios.post(
        serverURL + "/api/plans/add-membership",
        inputField,
        { withCredentials: true }
      );
      console.log(result);
      toast.success("Membership updated")
      handleClose();
    } catch (error) {
      toast.error("Some technical issue.")
      console.log(error);
    }
  };
  return (
    <div className="w-full h-full flex flex-col gap-[20px]">
      <div className="uppers flex flex-wrap justify-center items-center gap-[10px] max-h-[50%] overflow-y-auto">
        {membership.map((item, idx) => {
          return (
            <div
              key={idx}
              className="bg-slate-800 text-white px-[20px] py-[10px] font-semibold rounded-xl"
            >
              <h1>{item.months} Month Membership</h1>
              <h1>{item.price} Rs.</h1>
            </div>
          );
        })}
      </div>
      <div className="lower flex w-full justify-around px-[10px] py-[10px] mt-[20px]">
        <input
          className="w-[35%] h-full border-2 outline-none px-[10px] py-[5px] rounded-lg border-gray-400 font-semibold"
          type="number"
          placeholder="Add No. of Months"
          value={inputField.months}
          onChange={(e) => handleChange("months", e.target.value)}
        />
        <input
          className="w-[35%] h-full border-2 outline-none px-[10px] py-[5px] rounded-lg border-gray-400 font-semibold"
          type="number"
          placeholder="Price"
          value={inputField.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />
        <button
          className="border-2 border-gray-400 px-[10px] py-[5px] rounded-lg cursor-pointer font-semibold hover:bg-linear-to-r from-indigo-500 to-pink-500 via-purple-500 hover:text-black hover:font-bold"
          onClick={() => {
            addMembership();
          }}
        >
          <span>Add</span> <AddIcon />
        </button>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default MembershipPopup;
