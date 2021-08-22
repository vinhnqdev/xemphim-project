export const API_KEY = "f81980ff410e46f422d64ddf3a56dddd";

const requests = {
  // tv
  tvAiringRequest: `/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`,
  tvPopularRequest: `/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
  // movies
  movieRequest: `/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`,
  moviePupularRequest: `/movie/popular?api_key=${API_KEY}&language=en-US&page=1`,
  trendingRequest: `/trending/all/day?api_key=${API_KEY}`,
  // Search
  searchMultiRequest: `/search/multi?api_key=${API_KEY}&language=vi&include_adult=false&page=1`,

  // Filter
  filterByGenresRequest: `/genre/movie/list?api_key=${API_KEY}&language=vi`,
};

export default requests;
