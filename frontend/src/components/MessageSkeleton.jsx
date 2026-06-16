import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function MessageSkeleton({ isMe = false }) {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      {!isMe && (
        <div className="w-7 h-7 mr-2 shrink-0 flex items-end">
          <div className="w-7 h-7 bg-gradient-to-r from-ig-border to-ig-text-gray rounded-full animate-pulse" />
        </div>
      )}

      <div
        className={cn(
          "max-w-[65%] sm:max-w-[60%] flex flex-col gap-2",
          isMe ? "items-end" : "items-start"
        )}
      >
        {/* Skeleton for message bubble */}
        <div
          className={cn(
            "h-10 rounded-[22px] animate-pulse",
            isMe
              ? "w-48 bg-gradient-to-r from-violet-900 to-fuchsia-900"
              : "w-56 bg-gradient-to-r from-ig-border to-ig-text-gray"
          )}
        />
        
        {/* Skeleton for time */}
        <div className="h-3 w-12 bg-gradient-to-r from-ig-border to-ig-text-gray rounded animate-pulse" />
      </div>
    </div>
  );
}

export default MessageSkeleton;
