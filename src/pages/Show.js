import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import requests from "../api/Requests";
import Container from "../components/layout/Container";
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
const Show = () => {
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
    <section className="show">
      <Container>
        <TitleMovie title="TV" />
        <ListMovie
          type="tv"
          fetchUrl={requests.tvPopularRequest + `&page=${page}`}
          desiredAmount={20}
          onTotalPages={totalPagesHandler}
          onError={errorHandler}
        />
        <Pagination currentPage={+page} totalPages={totalPages} />
      </Container>
    </section>
  );
};
export default Show;
