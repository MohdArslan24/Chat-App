import { configureStore } from '@reduxjs/toolkit';


import authReducer from './auth/authSlice';
import chatReducer from './chat/chatSlice';
import userReducer from './user/userSlice';
import socketReducer from './socket/socketSlice';

 const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    user: userReducer,
    socket: socketReducer,
  },
});

export default store;