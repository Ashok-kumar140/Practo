import React from "react";
import logo from '../assets/logo.png';
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="p-4 bg-white shadow">
      <div className="flex items-center justify-between space-x-2 w-[1300px] mx-auto">
        <div className="text-blue-600 text-2xl font-bold cursor-pointer"
         onClick={()=>navigate('/')}
         >
            <img src={logo} width={150} height={70}></img>
        </div>
        <div>
        <Link to="/doctors" className="text-gray-800">Find Doctors</Link>
        </div>
        <button className=" text-gray-500 px-3 py-2 rounded-md border-2 border-gray-100 hover:text-cyan-400 hover:border-cyan-400">
          Login / Signup
        </button>
      </div>
      
    </header>
  );
};

export default Header;
