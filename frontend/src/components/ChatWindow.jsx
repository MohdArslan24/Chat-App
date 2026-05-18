import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Phone,
  Video,
  Info,
  Smile,
  Image as ImageIcon,
  Heart,
  Send,
  UserRound
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import api from "../utils/axios";
import MessageBubble from "./MessageBubble";
import MessageContainer from "./MessageContainer";
import Loader from "./Loader";
import { setSelectedUser } from "../store/user/userSlice";
import { sendMessage, getMessages } from "../store/chat/chatThunk";
import { clearMessages } from "../store/chat/chatSlice";

export default function ChatWindow() {
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { SelectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    dispatch(clearMessages());
    handlegM();
  }, [SelectedUser]);

  const handlegM = async () => {
    setLoading(true);
    const gM = await dispatch(getMessages(SelectedUser._id));
    if (gM.meta.requestStatus === "fulfilled") {
      setLoading(false);
    }
  
  };
  if (!messages) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center bg-ig-black h-full">
        <div className="text-center flex flex-col items-center">
          <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mb-4">
            <Send className="w-12 h-12 text-white -ml-1 mt-1 transform -rotate-12" />
          </div>
          <h2 className="text-xl font-normal text-white">Your Messages</h2>
          <p className="text-ig-text-gray mt-2 text-sm">
            Send private photos and messages to a friend or group.
          </p>
          <button className="mt-6 bg-ig-blue hover:bg-blue-600 text-white font-semibold py-1.5 px-4 rounded-lg text-sm transition-colors">
            Send message
          </button>
        </div>
      </div>
    );
  }

  const handleSend = (e) => {
    e.preventDefault();
    if (newMessage.trim() && socket) {
      socket.emit("send_message", {
        receiverId: chat._id,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

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

    try {
      setUploading(true);
      const res = await api.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (socket) {
        socket.emit("send_message", {
          receiverId: chat._id,
          image: res.data.imageUrl,
        });
      }
    } catch (err) {
      console.error("Image upload failed", err);
    } finally {
      setUploading(false);
      e.target.value = null; // reset input
    }
  };

  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    // You can emit typing events here if desired
    // socket.emit('typing', chat._id);
  };

  return (
    <div className="flex-1 flex flex-col bg-ig-black h-full w-full">
      {/* Header */}
      <div className="h-[75px] px-5 flex items-center justify-between border-b border-ig-border shrink-0 bg-ig-black z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={() => dispatch(setSelectedUser(null))}
            className="md:hidden text-white mr-1"
          >
            <ArrowLeft className="w-6 h-6 cursor-pointer" />
          </button>
          {SelectedUser?.profileImage &&
          SelectedUser?.profileImage.length > 0 ? (
            <img
              src={SelectedUser?.profileImage}
              alt={`${SelectedUser?.name[0]}${SelectedUser?.name.slice(-1)}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-ig-hover flex items-center justify-center">
              <UserRound />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-white text-[16px] cursor-pointer hover:underline">
              {SelectedUser?.name}
            </span>
          </div>
        </div>
      </div>
      {loading ? <Loader /> : <MessageContainer />}

      {/* Input Area */}
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
                className="hidden"
              />
              <button
                className="p-2 text-white hover:opacity-70 transition-opacity"
                onClick={() => fileInputRef.current.click()}
              >
                <ImageIcon className="w-6 h-6" />
              </button>
              <button className="p-2 text-white hover:opacity-70 transition-opacity">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
