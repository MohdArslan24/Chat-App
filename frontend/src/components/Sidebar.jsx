import React, { useEffect, useState } from "react";
import { ChevronDown, Edit, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import api from "../utils/axios";
import ChatItem from "./ChatItem";
import { getOtherUsers } from "../store/user/userThunk";
import { setSelectedUser } from "../store/user/userSlice";

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.auth);
  const { otherUsers } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOtherUsers());
  }, [dispatch]);

  useEffect(() => {
    if (search.trim()) {
      api.get(`/users?search=${search}`).then((res) => setUsers(res.data));
    } else {
      setUsers([]);
    }
  }, [search]);

  return (
    <div className="w-full md:w-[30%] lg:w-[350px] h-full border-r border-ig-border flex flex-col bg-ig-black flex-shrink-0">
      {/* Header */}
      <div className="h-[75px] px-5 flex items-center justify-between border-b border-ig-border shrink-0">
        <div className="flex items-center gap-1 cursor-pointer">
          <span className="font-bold text-xl text-white">
            {currentUser?.name || "_user"}
          </span>
          <ChevronDown className="w-5 h-5 text-white" />
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-ig-dark-gray text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-ig-border placeholder-ig-text-gray transition-shadow"
            placeholder="Search users..."
          />
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
          {search ? otherUsers.map((u) => (
                <ChatItem
                  key={u._id}
                  chat={{ ...u, lastMessage: "Start a chat" }}
                  isActive={activeChatId === u._id}
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
