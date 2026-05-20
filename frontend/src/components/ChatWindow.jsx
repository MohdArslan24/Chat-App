import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { clearMessages } from "../store/chat/chatSlice";
import { getMessages } from "../store/chat/chatThunk";

//Components
import MessageBubble from "./MessageBubble";
import MessageContainer from "./MessageContainer";
import Loader from "./Loader";
import ChatWinHeader from "./ChatWinHeader";
import MsgInput from "./MsgInput";
import Typing from "./Typing";

export default function ChatWindow() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { SelectedUser } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.chat);
 

  useEffect(() => {
    dispatch(clearMessages());
    handlegM();
  }, [SelectedUser]);

  const handlegM = async () => {
    setLoading(true);
    const gM = await dispatch(getMessages(SelectedUser._id));
    if (gM.meta.requestStatus === "fulfilled") {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex-1 flex flex-col bg-ig-black h-full w-full">
      {/* Header */}
      <ChatWinHeader />

      {/* Chat screen */}
      {loading ? <Loader /> : <MessageContainer />}

      {/* Typing Indicator */}
      <Typing />

      {/*Message Input Area */}
      <MsgInput />
    </div>
  );
}
