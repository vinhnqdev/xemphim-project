import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import { API_KEY } from "../api/Api-key";
import Container from "../components/layout/Container";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/use-pagination";
import movieApi from "../api/movieApi";

const Show = () => {
  const { page, totalPages, hasError, totalPagesHandler, errorHandler } =
    usePagination();

  if (hasError) {
    return <p>Không tìm thấy phim bạn yêu cầu, xin vui lòng thử lại</p>;
  }
  return (
    <section className="show">
      <Container>
        <TitleMovie title="TV" />
        <ListMovie
          type="tv"
          api={movieApi.getPopularTv}
          params={{ api_key: API_KEY, language: "en-US", page: page }}
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
