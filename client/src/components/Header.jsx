import React from "react";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate("/");
  };
  return (
    <header className="p-4 bg-white shadow">
      <div className="flex items-center justify-between space-x-2 w-[100%] mx-auto">
        <div
          className="text-blue-600 text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} width={150} height={70}></img>
        </div>
        <div>
          <Link to="/doctors" className="text-gray-800">
            Find Doctors
          </Link>
        </div>
        {user ? (
          <button
            className=" text-gray-500 px-3 py-2 rounded-md border-2 border-gray-100 hover:text-cyan-400 hover:border-cyan-400"
            onClick={handleLogout}
          >
            LogOut
          </button>
        ) : (
          <button
            className=" text-gray-500 px-3 py-2 rounded-md border-2 border-gray-100 hover:text-cyan-400 hover:border-cyan-400"
            onClick={() => navigate("/login")}
          >
            Login / Signup
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
