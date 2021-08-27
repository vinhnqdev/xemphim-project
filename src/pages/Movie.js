import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import requests from "../api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../app/filterSlice";
import Pagination from "../components/Pagination/Pagination";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const parseParams = (querystring) => {
  // parse query string
  const params = new URLSearchParams(querystring);
  const obj = {};
  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
};

const Movie = () => {
  const dispatch = useDispatch();
  dispatch(filterActions.resetFilter());
  const filters = useSelector((state) => state.filter);
  const [totalPages, setTotalPages] = useState(null);
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const queryObj = parseParams(location.search);
  let { page } = queryObj;

  if (page === undefined) {
    page = 1;
  }

  if (
    isNaN(+page) ||
    isError ||
    (!queryObj.hasOwnProperty("page") && Object.keys(queryObj).length > 0)
  ) {
    return <p>Không tìm thấy phim bạn yêu cầu, xin vui lòng thử lại</p>;
  }

  const totalPagesHandler = (totalPages) => {
    setTotalPages(totalPages);
  };
  const errorHandler = () => {
    setIsError(true);
  };

  return (
    <section className="movie">
      <div className="container">
        <TitleMovie title="Movies" />
        <Filter filters={filters} />
        <ListMovie
          type="movie"
          fetchUrl={requests.moviePupularRequest + `&page=${page}`}
          desiredAmount={20}
          onError={errorHandler}
          onTotalPages={totalPagesHandler}
        />
        <Pagination currentPage={+page} totalPages={totalPages} />
      </div>
    </section>
  );
};
export default Movie;
