import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { setSelectedUser } from "../store/user/userSlice";
import { useDispatch } from "react-redux"

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function ChatItem({ chat }) {

  const dispatch = useDispatch();


  return (
    <div
      onClick={() => {
        dispatch(setSelectedUser(chat));
      }}
      className={cn(
        "flex items-center px-5 py-3 cursor-pointer transition-colors duration-200 hover:bg-ig-hover",
      )}
    >
      <div className="relative">
        {chat.profileImage && chat.profileImage.length > 0 ? (
          <img
            src={chat.profileImage}
            alt={`${chat?.name[0]}${chat?.name.slice(-1)}`}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-ig-hover flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {`${chat?.name[0]}${chat?.name.slice(-1)}`.toUpperCase()}
            </span>
          </div>
        )}
        {/* {chat.isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-ig-black rounded-full" />
        )} */}
        <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-ig-black rounded-full" />
      </div>

      <div className="ml-4 flex-1 overflow-hidden">
        <div className="flex justify-between items-baseline">
          <span
            className={cn(
              "text-sm truncate",
              chat?.unread
                ? "font-bold text-white"
                : "font-semibold text-white",
            )}
          >
            {chat?.name}
          </span>
          {chat?.timestamp && (
            <span className="text-xs text-ig-text-gray ml-2 shrink-0">
              {chat?.timestamp}
            </span>
          )}
        </div>
        <div className="flex items-center mt-1">
          <p
            className={cn(
              "text-sm truncate",
              chat?.unread
                ? "font-bold text-white"
                : "text-ig-text-gray font-normal",
            )}
          >
            {chat?.lastMessage}
          </p>
          {chat?.unread && (
            <span className="w-2 h-2 bg-ig-blue rounded-full ml-2 shrink-0" />
          )}
        </div>
      </div>
    </div>
  );
}
