import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../filterSlice";
import movieSlice from "../movieSlice";
import userSlice from "../userSlice";

const store = configureStore({
  reducer: {
    details: movieSlice,
    filter: filterSlice,
    user: userSlice,
  },
});

export default store;
