import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { UserRound } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Typing() {

  const { typingStatus } = useSelector((state) => state.chat);
  const { SelectedUser } = useSelector((state) => state.user);


  return (
    <div>
      {/* Typing Indicator */}
      {typingStatus.isTyping && (
        <div className="px-4 py-3 bg-ig-black animate-in fade-in duration-300 ease-out">
          <div className="flex items-end gap-2">
            {/* Profile Image */}
            <div className="w-8 h-8 rounded-full bg-ig-hover flex items-center justify-center shrink-0 animate-in zoom-in duration-300">
              {SelectedUser?.profileImage && SelectedUser?.profileImage.length > 0 ? (
                <img
                  src={SelectedUser?.profileImage}
                  alt={SelectedUser?.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <UserRound size={20} className="text-white" />
              )}
            </div>

            {/* Typing Animation Bubble */}
            <div
              className={cn(
                "px-4 py-3 text-[15px] leading-[20px] rounded-[22px] bg-ig-dark-gray border border-ig-border flex items-center gap-1.5",
                "animate-in slide-in-from-left duration-300 ease-out"
              )}
            >
              <div className="w-2.5 h-2.5 bg-ig-text-gray rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-ig-text-gray rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2.5 h-2.5 bg-ig-text-gray rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
