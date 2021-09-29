const { createSlice } = require("@reduxjs/toolkit");

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    personUrl: "",
    isColumnList: false,
  },
  reducers: {
    updatepersonUrl: (state, action) => {
      state.personUrl = action.payload;
    },
    directList: (state, action) => {
      state.isColumnList = action.payload;
    },
  },
});

// export const fetchMovieDetails = (pathname, id) => {
//   const params = {
//     api_key: API_KEY,
//     language: "vi",
//     append_to_response: "credits",
//   };
//   const paramsVideo = {
//     api_key: API_KEY,
//     language: "en-US",
//     append_to_response: "videos",
//   };
//   const type = pathname.includes("tv") ? "tv" : "movie";
//   return (dispatch) => {
//     movieApi
//       .getDetails(type, id, params)
//       .then((res) => {
//         // console.log(res);
//         dispatch(movieActions.updateMovieDetails(res));
//       })
//       .catch((error) => {
//         dispatch(movieActions.catchError(true));
//       });
//     movieApi
//       .getDetails(type, id, paramsVideo)
//       .then((res) => {
//         dispatch(movieActions.updateTrailer(res.videos.results));
//       })
//       .catch((error) => {
//         console.log("Something went wrong!!!");
//       });
//   };
// };

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
