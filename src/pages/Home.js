import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import { useSelector } from "react-redux";
import movieApi from "../api/movieApi";
import { API_KEY } from "../api/Api-key";
import { useMemo } from "react";

const Home = () => {
  const filters = useSelector((state) => state.filter);
  const isColumnList = useSelector((state) => state.movie.isColumnList);

  const defaultParams = useMemo(() => {
    return {
      api_key: API_KEY,
      language: "vi",
    };
  }, []);

  return (
    <section className="home">
      <Filter filters={filters} />
      <ListMovie
        api={movieApi.getTrending}
        params={defaultParams}
        title="XU HƯỚNG HÔM NAY"
        desiredAmount={10}
        isColumnList={isColumnList}
      />
      <ListMovie
        api={movieApi.getUpcomingMovie}
        params={{ api_key: API_KEY, language: "vi", page: 1 }}
        title="PHIM SẮP CHIẾU"
        desiredAmount={10}
        type="movie"
        isColumnList={isColumnList}
      />
      <ListMovie
        api={movieApi.getTvAiring}
        params={{ api_key: API_KEY, language: "vi", page: 1 }}
        title="TV SHOW"
        desiredAmount={10}
        type="tv"
        isColumnList={isColumnList}
      />
    </section>
  );
};
export default Home;
