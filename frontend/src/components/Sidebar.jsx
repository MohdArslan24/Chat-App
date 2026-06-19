import React, { useEffect, useState } from "react";
import { ChevronDown, Edit, Search, X, UserRound } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/axios";
import ChatItem from "./ChatItem";
import { getOtherUsers } from "../store/user/userThunk";
import { setSelectedUser } from "../store/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.auth);
  const { otherUsers } = useSelector((state) => state.user);
  const [searchUsers, setSearchUsers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    dispatch(getOtherUsers());
  }, [dispatch]);

  useEffect(() => {
    if (searchValue) {
      setSearchUsers(
        otherUsers.filter((user) =>
          user.name.toLowerCase().includes(searchValue),
        ),
      );
    } else {
      setSearchUsers([]);
    }
  }, [searchValue]);

  return (
    <div className="w-full md:w-[30%] lg:w-[350px] h-full border-r border-ig-border flex flex-col bg-ig-black flex-shrink-0">

      {/* Header */}
      <div className="h-[75px] px-5 flex items-center justify-between border-b border-ig-border shrink-0">
        <div className="flex gap-3 cursor-pointer"  onClick={() => navigate("/profile")}>
        {currentUser?.profilePicture && currentUser?.profilePicture.length > 0 ? (
            <img
              src={currentUser?.profilePicture}
              alt={`${currentUser?.name[0]}${currentUser?.name.slice(-1)}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-ig-hover flex items-center justify-center">
              <UserRound />
            </div>
          )}
        <div className="flex items-center gap-1 cursor-pointer" >
          <span className="font-bold text-xl text-white">
            {currentUser?.name || "_user"}
          </span>
          
        </div>
        </div>
        <button className="text-white hover:opacity-70 transition-opacity">
          <Edit className="w-6 h-6" />
        </button>
      </div>

      {/* Search */}
      <div className="px-5 py-4 shrink-0">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-ig-text-gray" />
          </div>
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full bg-ig-dark-gray text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-ig-border placeholder-ig-text-gray transition-shadow"
            placeholder="Search users..."
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={() => setSearchValue("")}
          >
            <X className="w-4 h-4 text-ig-text-gray" />
          </div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-center px-5 mb-2">
          <span className="font-bold text-white text-base">Messages</span>
          <span className="text-sm font-semibold text-ig-text-gray cursor-pointer hover:text-white transition-colors">
            Requests
          </span>
        </div>

        <div className="mt-2">
          {searchValue ? 
            searchUsers.map((u) => (
                <ChatItem
                  key={u._id}
                  chat={{ ...u, lastMessage: "Start a chat" }}
                  onClick={(selectedChat) => {
                    dispatch(setSelectedUser(selectedChat));
                    dispatch(setActiveChatId(selectedChat._id));
                  }}
                />
              ))
            : otherUsers?.map((chat) => {
                return <ChatItem key={chat._id} chat={chat} />;
              })}
        </div>
      </div>
    </div>
  );
}
