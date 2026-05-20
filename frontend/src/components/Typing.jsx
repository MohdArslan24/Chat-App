import React from 'react'
import { useDispatch, useSelector } from "react-redux";

export default function Typing() {

  const { typingStatus } = useSelector((state) => state.chat);
  const { SelectedUser } = useSelector((state) => state.user);


  return (
    <div>
      {/* Typing Indicator */}
      {typingStatus.isTyping && (
        <div className="px-4 py-2 bg-ig-black">
          <div className="flex items-center gap-2">
            <span className="text-ig-text-gray text-sm">{SelectedUser?.name} is typing</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-ig-text-gray rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-ig-text-gray rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
              <div className="w-2 h-2 bg-ig-text-gray rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
