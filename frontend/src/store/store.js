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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore the specific state action path where the socket lives
        ignoredPaths: ['socket.socket'],
      },
    }),
});

export default store;