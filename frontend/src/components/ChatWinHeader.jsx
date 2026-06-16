import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserRound, ArrowLeft } from "lucide-react";
import { setSelectedUser } from "../store/user/userSlice";

function ChatWinHeader() {
  const dispatch = useDispatch();

  const { SelectedUser } = useSelector((state) => state.user);
  const {onlineUsers} = useSelector(state => state.socket);

  return (
    <div className="h-[75px] px-5 flex items-center justify-between border-b border-ig-border shrink-0 bg-ig-black z-20">
      <div className="flex items-center gap-3">
        <button
          onClick={() => dispatch(setSelectedUser(null))}
          className="md:hidden text-white mr-1"
        >
          <ArrowLeft className="w-6 h-6 cursor-pointer" />
        </button>

        <div className="relative">
          {SelectedUser?.profilePicture && SelectedUser?.profilePicture.length > 0 ? (
            <img
              src={SelectedUser?.profilePicture}
              alt={`${SelectedUser?.name[0]}${SelectedUser?.name.slice(-1)}`}
              className="w-12 h-12 rounded-full object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-ig-hover flex items-center justify-center">
              <UserRound />
            </div>
          )}
          
          {/* Online Status Indicator */}
          {onlineUsers?.includes(SelectedUser._id) && (
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-ig-black rounded-full" />
          )}
        </div>
        
        <div className="flex flex-col">
          <span className="font-semibold text-white text-[16px] cursor-pointer hover:underline">
            {SelectedUser?.name}
          </span>
          {onlineUsers?.includes(SelectedUser._id) && (
            <span className="text-[13px] text-gray-500">Active now</span>
          )}
          
        </div>
      </div>
    </div>
  );
}

export default ChatWinHeader;
