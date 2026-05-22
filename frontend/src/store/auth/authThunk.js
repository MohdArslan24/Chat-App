import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import { toast } from "react-hot-toast";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.userData));
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!");
        return response.data.userData;
      } else {
        toast.error(response.data.message);
        return rejectWithValue(response.data);
      }
    } catch (error) {
      toast.error("Login failed!");
      return rejectWithValue(error.response.data);
    }
  },
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/signup", userData);
      localStorage.setItem("token", response.data.token);
      toast.success("Account created successfully!");
      return response.data;
    } catch (error) {
      toast.error("Failed to create account!");
      return rejectWithValue(error.response.data);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged out successfully!");
      return;
    } catch (error) {
      toast.error("Failed to log out!");
      return rejectWithValue(error.response.data);
    }
  },
);

export const verifyToken = createAsyncThunk(
  "auth/verifyToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return rejectWithValue("No token found");
      }

      // Verify token with backend using axiosInstance
      const res = await axiosInstance.get("/auth/protected");

      if (res.data.success) {
        return res.data.user;
      }
      return rejectWithValue("Invalid token");
    } catch (err) {
      // Clear invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return rejectWithValue(
        err.response?.data?.message || "Token verification failed",
      );
    }
  },
);

