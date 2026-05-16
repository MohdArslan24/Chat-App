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
    addMessage: (state, action) => {
      const { receiverId, senderId } = action.payload;
      // We index messages by the "other person's ID".
      // If we are sender, index by receiverId. If we are receiver, index by senderId.
      const otherPersonId = state.activeChatId; // Simplification for current view
      if (!state.messages[otherPersonId]) {
        state.messages[otherPersonId] = [];
      }
      state.messages[otherPersonId].push(action.payload);

      // Update last message in chat list
      const chat = state.chats.find((c) =>
        c.participants.some((p) => p._id === otherPersonId),
      );
      if (chat) {
        chat.lastMessage = action.payload.text || "Image";
        chat.updatedAt = new Date().toISOString();
      }
    },
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

export const { setActiveChatId, addMessage, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;
