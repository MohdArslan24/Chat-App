import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";



export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, message }, { rejectWithValue }) => {
    try {
      if (!receiverId || !message) {
        return rejectWithValue("Receiver ID and message are required");
      }
      
      const response = await axiosInstance.post(
        `/message/send/${receiverId}`,
        { message }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const getMessages = createAsyncThunk(
  "chat/getMessages",
  async (receiverId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/message/recieve/${receiverId}`,
      );
      if(response.data.data) {
        
        return response.data.data.messages;
      }
      else{
        return [];
      }
      
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
