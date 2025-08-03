import Login from "../components/Login";
import Registration from "../components/Registration";

const Home = () => {
  return (
    <div className="w-screen h-screen overflow-auto pb-[20px] md:overflow-hidden">
      <div className="w-full h-fit p-2.5 bg-slate-800 border-2 border-slate-800 text-white font-semibold text-xl ">
        Welcome to Gym Management System
      </div>
      <div className="w-full h-full bg-[url('https://thumbs.dreamstime.com/b/modern-gym-interior-neon-lighting-fitness-equipment-night-spacious-gym-featuring-sleek-fitness-machines-illuminated-355982421.jpg')] bg-cover">
        <div className="w-full h-full pt-[40px] pl-[40px] flex justify-around flex-col md:flex-row overflow-y-auto">
          <Login />
          <Registration />
        </div>
      </div>
    </div>
  );
};

export default Home;
