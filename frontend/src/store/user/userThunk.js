import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";
import toast from "react-hot-toast";

export const getOtherUsers = createAsyncThunk(
  "user/getOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/other-users");
      return response.data.data;
    } catch (error) {
      toast.error("Failed to fetch other users!");
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/user/update-profile", userData);
      if(response.data.success) {
        toast.success("Profile updated successfully!");
        return response.data.data;
      }
        toast.error(response.data.message);
      
    } catch (error) {
      toast.error("something went wrong!");
      return rejectWithValue(error.response.data);
    }
  },
);
