import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLeft,
  Phone,
  Video,
  Info,
  Smile,
  Image as ImageIcon,
  Heart,
  Send,
  UserRound,
  Loader2,
} from "lucide-react";

import axiosInstance from "../utils/axios";
import { sendMessage, getMessages, sendImage } from "../store/chat/chatThunk";
import { clearMessages } from "../store/chat/chatSlice";


function MsgInput() {
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const { SelectedUser } = useSelector((state) => state.user);
  const { messages, typingStatus } = useSelector((state) => state.chat);
  const { socket } = useSelector((state) => state.socket);

  const handleSendMsg = (e) => {
    e.preventDefault();
    if (newMessage.trim() && SelectedUser?._id) {
      dispatch(
        sendMessage({
          receiverId: SelectedUser._id,
          message: newMessage,
        }),
      );
      setNewMessage("");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    console.log(formData)

    try {
      setUploading(true);
      const res = await axiosInstance.post("/message/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });


      if (res.data.success && SelectedUser?._id) {
        dispatch(
          sendMessage({
            receiverId: SelectedUser._id,
            image: res.data.data.imageUrl,
            message: null,
          }),
        );
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
      e.target.value = null; // reset input
    }
  };

  const typingTimeoutRef = useRef(null);
  const isTypingRef = useRef(false);

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    // emit typing only first time

    if (!isTypingRef.current) {
      socket.emit("typing", {
        senderId: currentUser._id,
        receiverId: SelectedUser._id,
      });

      isTypingRef.current = true;
    }

    // clear old timeout
    clearTimeout(typingTimeoutRef.current);

    // start new timeout
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stopTyping", {
        senderId: currentUser._id,
        receiverId: SelectedUser._id,
      });

      isTypingRef.current = false;
    }, 1500);
  };

  return (
    <div className="p-4 bg-ig-black shrink-0">
      <div className="flex items-center border border-ig-border rounded-full pl-3 pr-2 py-1.5 bg-ig-black focus-within:border-ig-text-gray transition-colors">
        <button className="p-2 text-white hover:opacity-70 transition-opacity shrink-0">
          <Smile className="w-6 h-6" />
        </button>

        <form
          onSubmit={handleSendMsg}
          className="flex-1 flex items-center mx-1"
        >
          <input
            type="text"
            value={newMessage}
            onChange={handleTyping}
            placeholder="Message..."
            className="w-full bg-transparent text-white text-sm focus:outline-none placeholder-ig-text-gray min-w-0"
          />
        </form>

        {newMessage.trim() ? (
          <button
            onClick={handleSendMsg}
            className="px-3 font-semibold text-ig-blue hover:text-white transition-colors"
          >
            Send
          </button>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
            <button
              className="p-2 text-white hover:opacity-70 transition-opacity disabled:opacity-50"
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
            >
              {uploading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <ImageIcon className="w-6 h-6" />
              )}
            </button>
            <button className="p-2 text-white hover:opacity-70 transition-opacity">
              <Heart className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MsgInput;
