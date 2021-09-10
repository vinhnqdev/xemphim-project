import { createSlice } from "@reduxjs/toolkit";
const initialFilter = {
  genresFilter: { type: "genre", value: "" },
  countryFilter: { type: "country", value: "" },
  yearFilter: { type: "year", value: "" },
  durationFilter: { type: "duration", value: "" },
  sortFilter: { type: "sort", value: "" },
};
const filterSlice = createSlice({
  name: "filter",
  initialState: JSON.parse(JSON.stringify(initialFilter)),
  reducers: {
    updateFilters: (state, action) => {
      const { type, value } = action.payload;
      if (type === "genre") {
        state.genresFilter.value = value;
      }
      if (type === "country") {
        state.countryFilter.value = value;
      }
      if (type === "year") {
        state.yearFilter.value = value;
      }
      if (type === "duration") {
        state.durationFilter.value = value;
      }
      if (type === "sort") {
        state.sortFilter.value = value;
      }
    },

    resetFilter: (state) => {
      // console.log("RESET");
      // console.log(initialFilter);
      state.genresFilter.value = "";
      state.countryFilter.value = "";
      state.yearFilter.value = "";
      state.durationFilter.value = "";
      state.sortFilter.value = "";
      state = { ...initialFilter };
      // state = JSON.parse(JSON.stringify(initialFilter));
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
