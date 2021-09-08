import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import { useSelector } from "react-redux";
import movieApi from "../api/movieApi";
import { API_KEY } from "../api/Api-key";

const Home = () => {
  const filters = useSelector((state) => state.filter);

  return (
    <section className="home">
      <Filter filters={filters} />
      <ListMovie
        api={movieApi.getTrending}
        params={{ api_key: API_KEY }}
        title="XU HƯỚNG HÔM NAY"
        desiredAmount={10}
      />
      <ListMovie
        api={movieApi.getUpcomingMovie}
        params={{ api_key: API_KEY, language: "en-US", page: 1 }}
        title="PHIM SẮP CHIẾU"
        desiredAmount={10}
        type="movie"
      />
      <ListMovie
        api={movieApi.getTvAiring}
        params={{ api_key: API_KEY, language: "en-US", page: 1 }}
        title="TV SHOW"
        desiredAmount={10}
        type="tv"
      />
    </section>
  );
};
export default Home;
