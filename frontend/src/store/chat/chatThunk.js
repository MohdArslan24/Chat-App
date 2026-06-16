import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiverId, message, image }, { rejectWithValue }) => {
    try {
      if (!receiverId || (!message && !image)) {
        return rejectWithValue("Receiver ID and message or image are required");
      }

      const response = await axiosInstance.post(`/message/send/${receiverId}`, {
        message: message || null,
        image: image || null,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const sendImage = createAsyncThunk(
  "chat/sendImage",
  async ({receiverId, image} , { rejectWithValue }) => {
    try {
      console.log("Sending image with receiverId:", receiverId, "and image:", image);
      if (!receiverId || !image) {
        return rejectWithValue("Receiver ID and image are required");
      }
      const res = await axiosInstance.post("/message/upload", image, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data.success) {
        await axiosInstance.post(`/message/send/${receiverId}`, {
          message: null,
          image: res.data.data.imageUrl,
        });
      } else {
        return rejectWithValue("Image upload failed");
      }
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
      if (response.data.data) {
        return response.data.data.messages;
      } else {
        return [];
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
