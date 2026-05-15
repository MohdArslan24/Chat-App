import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../store/chat/chatSlice';

export const useSocket = () => {
  const socketRef = useRef(null);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const user = useSelector(state => state.auth.currentUser);

  useEffect(() => {
    if (token && user) {
      socketRef.current = io('http://localhost:5000', {
        auth: { token }
      });

      socketRef.current.on('connect', () => {
        socketRef.current.emit('setup', user);
      });

      socketRef.current.on('receive_message', (message) => {
        dispatch(addMessage(message));
        // You would typically also dispatch updateChatList here to move the chat to top
      });

      socketRef.current.on('online_users', (data) => {
        // Logic to update online status
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [token, user, dispatch]);

  return socketRef.current;
};
