import api from "./axios";
const movieApi = {
  getTrending: (params) => {
    const url = "/trending/all/day";
    return api.get(url, { params });
  },
  getUpcomingMovie: (params) => {
    const url = "/movie/upcoming";
    return api.get(url, { params });
  },
  getTvAiring: (params) => {
    const url = "/tv/airing_today";
    return api.get(url, { params });
  },
  getMovieWithSearch: (params) => {
    const url = "/search/multi";
    return api.get(url, { params });
  },
  getPopularMovie: (params) => {
    const url = "/movie/popular";
    return api.get(url, { params });
  },
  getPopularTv: (params) => {
    const url = "/tv/popular";
    return api.get(url, { params });
  },
  getMovieWithFilter: (params) => {
    const url = "discover/movie";
    return api.get(url, { params });
  },
  getDetails: (type, id, params) => {
    const url = `${type}/${id}`;
    return api.get(url, { params });
  },
};

export default movieApi;
