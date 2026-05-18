import { createSlice } from "@reduxjs/toolkit";
import api from "../../utils/axios";
import { sendMessage, getMessages } from "./chatThunk";

const initialState = {
  chats: null, // List of conversations
  messages: [], // Mapping receiverId to array of messages
  loading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    clearMessages: (state, action) => {
      state.messages = [];
    },
    
    setNewMessage: (state, action) => {
      const newMessage = action.payload;
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, newMessage];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages = [...state.messages, action.payload];
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messages = action.payload;
      })
      .addCase(getMessages.pending, (state) => {
        state.error = null;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.error = action.payload?.message || "Login failed";
      });
  },
});

export const { setActiveChatId, setNewMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
