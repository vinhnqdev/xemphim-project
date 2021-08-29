import axios from "axios";
import queryString from "query-string";
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // hander Error here
    throw error;
  }
);

export default api;
