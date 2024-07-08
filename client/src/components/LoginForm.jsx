import React, { useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken, setUser } from "../redux/slices/authSlice";
import { LOGIN_USER } from "../utils/Queries";
import { useMutation } from "@apollo/client";

const LoginForm = ({ setIsLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { loading: loginLoading, error: loginError, data: LoginData }] =
    useMutation(LOGIN_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const {data} = await login({
        variables: {
          email: formData.email,
          password: formData.password,
         
        },
      });
    
      console.log("LOGIN RESPONSE",data);

      toast.success("Logged In Successfully");
      dispatch(setToken(data?.loginUser?.token));

      dispatch(setUser(data?.loginUser));
      localStorage.setItem("token", JSON.stringify(data?.loginUser?.token));
      localStorage.setItem("user", JSON.stringify(data?.loginUser));
      navigate("/");
    } catch (error) {
      console.log("Error while logging in", error.message);
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleOnChange = (e) => {
    setFormData((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <form className="flex flex-col gap-2 opacity-100" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="email" className="label-style">
            User Email: <sup className="text-red-700">*</sup>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleOnChange}
            required
            className="input-field-style"
          />
        </div>

        <div className="relative">
          <label htmlFor="password" className="label-style">
            User Password: <sup className="text-red-700">*</sup>
          </label>
          <input
            type={`${!showPassword ? "password" : "text"}`}
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleOnChange}
            required
            className="input-field-style"
          />
          {!showPassword ? (
            <MdOutlineRemoveRedEye
              className="absolute top-[40px] right-[20px] text-black cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          ) : (
            <FaRegEyeSlash
              className="absolute top-[40px] right-[20px] text-black cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          )}
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="py-2 bg-black text-white rounded-md cursor-pointer w-[100%]">
            {loading ? "Loading..." : "Sign In"}
          </button>
        </div>
        <div className="text-black mb-2 text-center">
          <div className="flex items-center justify-center">
            New User?
            <p
              onClick={() => setIsLogin(false)}
              className="text-blue-600 cursor-pointer"
            >
              SignUp
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
