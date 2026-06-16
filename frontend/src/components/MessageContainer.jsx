import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../store/chat/chatThunk";
import { useState } from "react";
import MessageBubble from "./MessageBubble";


function MessageContainer() {
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { SelectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 pb-0 flex flex-col">
        <div className="flex flex-col mt-4">
          {messages.map((msg, index) => {
            const isSenderMe = currentUser.id === msg.sender;
            const showAvatar = !isSenderMe;

            return (
              <MessageBubble
                key={msg._id || index}
                messageBody={{
                  ...msg,
                  isSenderMe,
                  senderAvatar: SelectedUser?.profileImage,
                }}
                showAvatar={showAvatar}
              />
            );
          })}

          {uploading && (
            <p className="text-white text-sm text-center">Uploading image...</p>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </>
  );
}

export default MessageContainer;
