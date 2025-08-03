import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import { useEffect, useState } from "react";
import Members from "./pages/Members";
import GeneralUser from "./components/GeneralUser";
import MemberDetails from "./components/MemberDetails";
import "react-toastify/ReactToastify.css"

const App = () => {
  let navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    let isLoggedIn = localStorage.getItem("isLogin");
    if (isLoggedIn) {
      setIsLogin(true);
      navigate("/dashboard")
    } else {
      setIsLogin(false);
      navigate("/");
    }
  }, [localStorage.getItem("isLogin")]);
  return (
    <div className="w-screen h-screen overflow-x-hidden overflow-y-auto flex">
      {isLogin && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Members />} />
        <Route path="/specific/:page" element={<GeneralUser />} />
        <Route path="/member/:id" element={<MemberDetails />} />
      </Routes>
    </div>
  );
};

export default App;
