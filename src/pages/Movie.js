import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import requests from "../api/Requests";
const Movie = () => {
  return (
    <section className="movie">
      <div className="container">
        <TitleMovie title="Movies" />
        <Filter />
        <ListMovie
          type="movie"
          fetchUrl={requests.moviePupularRequest}
          desiredAmount={20}
        />
      </div>
    </section>
  );
};
export default Movie;
