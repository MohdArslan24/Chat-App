import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOtherUsers } from "../store/user/userThunk";
import {initializeSocket, setOnlineUsers} from '../store/socket/socketSlice'
import {setNewMessage, setTypingStatus} from "../store/chat/chatSlice"


//Components
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';

export default function Home() {
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chat.chats);
  const { currentUser, isAuthenticated } = useSelector((state) => state.auth);
  const {SelectedUser} = useSelector(state => state.user);
  const {socket} = useSelector(state => state.socket);

   useEffect(() => {
    dispatch(getOtherUsers());
  }, []);


   useEffect(() => {
    if(!isAuthenticated) return;
    dispatch(initializeSocket(currentUser?._id));
  }, [isAuthenticated]);

  useEffect(() => {
    if(!socket) return;
    
    socket.on("onlineUsers", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    })

    socket.on("newMessage", (newMessage) => {
      dispatch(setNewMessage(newMessage))
    })

    socket.on("typing", (senderId) => {
      dispatch(setTypingStatus({isTyping: true, senderId}))
    })

    socket.on("stopTyping", (senderId) => {
      dispatch(setTypingStatus({isTyping: false, senderId}))
    })
    
    return () => {
      socket.off("onlineUsers");
      socket.off("newMessage");
      socket.off("typing");
      socket.off("stopTyping");
      socket.close();
    }

  }, [socket, dispatch]);

 

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar - hidden on mobile when chat is active */}
      <div className={`w-full md:w-[350px] h-full transition-all duration-300 ${SelectedUser ? 'hidden md:flex' : 'flex'} flex-col`}>
        <Sidebar />
      </div>

      {/* Chat Window - full screen on mobile, flex on desktop */}
      {SelectedUser && (
        <div className="w-full md:flex-1 h-full flex">
          <ChatWindow />
        </div>
      )}

      {/* Empty state on desktop when no chat selected */}
      {!SelectedUser && (
        <div className="hidden md:flex flex-1 items-center justify-center bg-ig-black">
          <div className="text-center flex flex-col items-center">
            <div className="w-24 h-24 border-2 border-white rounded-full flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-normal text-white">Your Messages</h2>
            <p className="text-ig-text-gray mt-2 text-sm">Send private photos and messages to a friend or group.</p>
          </div>
        </div>
      )}
    </div>
  );
}
