import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import requests from "../api/Requests";

const Home = () => {
  return (
    <section className="home">
      <Filter />
      <ListMovie
        fetchUrl={requests.trendingRequest}
        title="Trend in day"
        desiredAmount={10}
      />
      <ListMovie
        fetchUrl={requests.movieRequest}
        title="Upcoming Movie"
        desiredAmount={10}
        type="movie"
      />
      <ListMovie
        fetchUrl={requests.tvAiringRequest}
        title="Airing TV"
        desiredAmount={10}
        type="tv"
      />
    </section>
  );
};
export default Home;
