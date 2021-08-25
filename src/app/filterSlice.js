import { createSlice } from "@reduxjs/toolkit";
const initialFilter = {
  genresFilter: "",
  countryFilter: "",
  yearFilter: "",
  durationFilter: "",
  sortFilter: "",
};
const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilter,
  reducers: {
    updateGenresFilter: (state, action) => {
      state.genresFilter = action.payload;
    },
    updateCountryFilter: (state, action) => {
      state.countryFilter = action.payload;
    },
    updateYearFilter: (state, action) => {
      state.yearFilter = action.payload;
    },
    updateDurationFilter: (state, action) => {
      state.durationFilter = action.payload;
    },
    updateSortFilter: (state, action) => {
      state.sortFilter = action.payload;
    },
    resetFilter: (state) => {
      console.log("RESET");
      state.genresFilter = "";
      state.countryFilter = "";
      state.yearFilter = "";
      state.durationFilter = "";
      state.sortFilter = "";
      // state = initialFilter;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
