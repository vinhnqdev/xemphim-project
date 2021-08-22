import axios from "../api/axios";
import { API_KEY } from "../api/Requests";
const { createSlice } = require("@reduxjs/toolkit");

const movieSlice = createSlice({
  name: "details",
  initialState: {
    movieDetails: null,
    personUrl: "",
  },
  reducers: {
    updateMovieDetails(state, action) {
      state.movieDetails = action.payload;
    },
    updatepersonUrl: (state, action) => {
      state.personUrl = action.payload;
    },
  },
});

export const fetchMovieDetails = (pathname) => {
  return (dispatch) => {
    axios
      .get(
        `${pathname}?api_key=${API_KEY}&language=vi&append_to_response=credits`
      )
      .then((res) => {
        dispatch(movieActions.updateMovieDetails(res.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
};

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
