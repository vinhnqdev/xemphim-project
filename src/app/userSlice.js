import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    login: (state, action) => {
      // const { email, uid } = action.payload;
      state.user = action.payload;
    },
    updateName: (state, action) => {
      state.user.displayName = action.payload;
    },
    signout: (state) => {
      state.user = {};
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice.reducer;
