import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signupAPI } from "../api/auth.api.js";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    signupAPI(formData, navigate);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-800 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-96 text-center bg-gray-900 border border-gray-800 rounded-2xl px-6 sm:px-8 py-8"
      >
        <h1 className="text-white text-2xl sm:text-3xl mt-4 sm:mt-10 font-medium">
          Sign up
        </h1>

        <p className="text-gray-400 text-xs sm:text-sm mt-2">
          Please sign up to continue
        </p>

        <div className="flex items-center mt-4 sm:mt-6 w-full bg-gray-800 border border-gray-700 h-11 sm:h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400 flex-shrink-0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <circle cx="12" cy="8" r="5" />{" "}
            <path d="M20 21a8 8 0 0 0-16 0" />{" "}
          </svg>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none text-sm"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center w-full mt-3 sm:mt-4 bg-gray-800 border border-gray-700 h-11 sm:h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400 flex-shrink-0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />{" "}
            <rect x="2" y="4" width="20" height="16" rx="2" />{" "}
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none text-sm"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center mt-3 sm:mt-4 w-full bg-gray-800 border border-gray-700 h-11 sm:h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400 flex-shrink-0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
          </svg>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none text-sm"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex-shrink-0 pr-4 sm:pr-6 text-gray-400 hover:text-white transition cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        </div>

        <div className="flex items-center mt-3 sm:mt-4 w-full bg-gray-800 border border-gray-700 h-11 sm:h-12 rounded-full overflow-hidden pl-4 sm:pl-6 gap-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400 flex-shrink-0"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
          </svg>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none text-sm"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="flex-shrink-0 pr-4 sm:pr-6 text-gray-400 hover:text-white transition cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="mt-5 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition cursor-pointer"
        >
          Sign up
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
        >
          Already have an account?
          <span className="text-indigo-400 hover:underline ml-1">
            click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
