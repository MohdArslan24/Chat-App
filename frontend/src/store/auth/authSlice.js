import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser, verifyToken, deleteUserAccount, updateUserProfile } from "./authThunk";

const initialState = {
  isAuthenticated: localStorage.getItem("token") ? true : false,
  currentUser: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isAuthenticated = false;
        state.currentUser = null;
      })
      .addCase(deleteUserAccount.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.currentUser = null;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete account";
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
          state.currentUser = action.payload;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
          state.error = action.payload?.message || "Failed to fetch other users";
        });
  },
});

export const { setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
