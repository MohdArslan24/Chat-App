import { createSlice } from "@reduxjs/toolkit";
import { getOtherUsers, updateUserProfile } from "./userThunk";

const initialState = {
  user: null,
  SelectedUser: null,
  otherUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelectedUser: (state, action) => {
      state.SelectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(getOtherUsers.fulfilled, (state, action) => {
          state.otherUsers = action.payload;
        })
        .addCase(getOtherUsers.rejected, (state, action) => {
          state.error = action.payload?.message || "Failed to fetch other users";
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
          console.log(action.payload);
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
          state.error = action.payload?.message || "Failed to fetch other users";
        });
  },
});

export const { setUser, clearUser, setSelectedUser } = userSlice.actions;
export default userSlice.reducer;