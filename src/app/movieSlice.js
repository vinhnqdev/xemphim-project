import movieApi from "../api/movieApi";
import { API_KEY } from "../api/Api-key";
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

export const fetchMovieDetails = (pathname, id) => {
  const params = {
    api_key: API_KEY,
    language: "en-US",
    append_to_response: "credits,videos",
  };
  const type = pathname.includes("tv") ? "tv" : "movie";
  return (dispatch) => {
    movieApi
      .getDetails(type, id, params)
      .then((res) => {
        dispatch(movieActions.updateMovieDetails(res));
      })
      .catch((error) => {
        // console.log(error.message);
      });
  };
};

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
