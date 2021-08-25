import { configureStore } from "@reduxjs/toolkit";
import filterSlice from "../filterSlice";
import movieSlice from "../movieSlice";

const store = configureStore({
  reducer: { details: movieSlice, filter: filterSlice },
});

export default store;
