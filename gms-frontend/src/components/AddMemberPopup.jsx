import axios from "axios";
import { useState } from "react";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const AddMemberPopup = () => {
  const [loading, setLoading] = useState(false)
  const [inputField, setInputField] = useState({
    name: "",
    mobileNo: "",
    address: "",
    joiningDate: "",
    profileImg:
      "https://content.jdmagicbox.com/comp/def_content/gymnasiums/default-gymnasiums-14.jpg",
  });
  let handleChange = (key, value) => {
    setInputField({ ...inputField, [key]: value });
    console.log(inputField);
  };
  let uploadImage = async (e) => {
    setLoading(true)
    let files = e.target.files;
    let data = new FormData();
    data.append("file", files[0]);

    data.append("upload_preset", "gym-management");
    try {
      let response = await axios.post(
        "https://api.cloudinary.com/v1_1/dnkdsknk0/image/upload",
        data
      );
      console.log(response);
      let imgURL = response.data.url;
      setInputField({ ...inputField, ["profileImg"]: imgURL });
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };
  return (
    <div className="grid grid-cols-2 gap-[20px] px-[20px] mt-[10px]">
      <input
        className="w-[90%] border-2 border-gray-400 outline-none px-[10px] py-[5px] font-semibold text-xl rounded-lg"
        type="text"
        placeholder="Name of Joinee"
        value={inputField.name}
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <input
        className="w-[90%] border-2 border-gray-400 outline-none px-[10px] py-[5px] font-semibold text-xl rounded-lg"
        type="text"
        placeholder="Mobile No."
        value={inputField.mobileNo}
        onChange={(e) => handleChange("mobileNo", e.target.value)}
      />
      <input
        className="w-[90%] border-2 border-gray-400 outline-none px-[10px] py-[5px] font-semibold text-xl rounded-lg"
        type="text"
        placeholder="Address"
        value={inputField.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
      <input
        className="w-[90%] border-2 border-gray-400 outline-none px-[10px] py-[5px]  text-xl rounded-lg"
        type="date"
        value={inputField.joiningDate}
        onChange={(e) => handleChange("joiningDate", e.target.value)}
      />
      <select className="w-[90%] border-2 border-gray-400 outline-none px-[10px] py-[5px] font-semibold text-xl rounded-lg">
        <option
          className="font-normal border-2 border-gray-400 "
          value=""
          disabled
          selected
          hidden
        >
          Select
        </option>
        <option className="font-normal border-2 border-gray-400 ">
          1 Month Membership
        </option>
        <option className="font-normal border-2 border-gray-400 ">
          2 Month Membership
        </option>
        <option className="font-normal border-2 border-gray-400 ">
          3 Month Membership
        </option>
      </select>
      <input
        className="w-[90%] border-2 border-gray-400 outline-none px-[10px] py-[5px]  rounded-lg"
        type="file"
        onChange={(e) => uploadImage(e)}
      />
     
      <img
        src={inputField.profileImg}
        alt="profileImg"
        className="w-[150px] h-[150px] rounded-full cursor-pointer"
      />
       <div>
        {loading && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      
      <LinearProgress color="inherit" />
    </Stack>}
      <button className="bg-slate-800 w-[80%] h-fit py-[10px] text-2xl font-semibold text-white border-[2px] border-white rounded-xl cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-black hover:font-bold transition-all">
        Register
      </button>
       </div>
    </div>
  );
};

export default AddMemberPopup;
