import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function MessageBubble({ messageBody, showAvatar }) {
  const isSent = messageBody.senderId === "me";

  const formattedTime = new Date(messageBody.createdAt).toLocaleTimeString([],{
    hour: "2-digit",
    minute: "2-digit"
  })

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isSent ? "justify-end" : "justify-start",
      )}
    >
      {!isSent && (
        <div className="w-7 h-7 mr-2 shrink-0 flex items-end">
          {showAvatar ? (
            <img
              src={messageBody.senderAvatar}
              alt="Avatar"
              className="w-7 h-7 rounded-full object-cover"
            />
          ) : (
            <div className="w-7 h-7" /> // Placeholder for alignment
          )}
        </div>
      )}

      <div
        className={cn(
          "max-w-[65%] sm:max-w-[60%] flex flex-col group",
          isSent ? "items-end" : "items-start",
        )}
      >
        {messageBody.image ? (
          <img
            src={message.image}
            alt="Message image"
            className="w-full rounded-[22px] object-cover mb-2"
          />
        ) : null}
        {messageBody.message && (
          <div
            className={cn(
              "px-3.5 py-2.5 text-[15px] leading-[20px] rounded-[22px]",
              isSent
                ? "bg-gradient-to-r from-violet-800 to-fuchsia-800 text-white font-medium"
                : "bg-ig-message-received text-white border border-ig-border",
            )}
          >
            <span>{messageBody.message}</span>

          </div>
        )}

        {messageBody.formattedTime && (
          <span className="text-[11px] text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {messageBody.formattedTime}
          </span>
        )}
      </div>
    </div>
  );
}
