import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import requests from "../api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../app/filterSlice";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/use-pagination";

const Movie = () => {
  const dispatch = useDispatch();
  dispatch(filterActions.resetFilter());
  const filters = useSelector((state) => state.filter);
  const { page, totalPages, hasError, totalPagesHandler, errorHandler } =
    usePagination();
  if (hasError) {
    return <p>Không tìm thấy phim bạn yêu cầu, xin vui lòng thử lại</p>;
  }
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
