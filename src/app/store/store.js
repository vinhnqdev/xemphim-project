import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "../movieSlice";

const store = configureStore({
  reducer: { details: movieSlice },
});

export default store;
