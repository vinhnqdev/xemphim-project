import Filter from "../components/UI/Filter/Filter";
import ListMovie from "../components/UI/ListMovie";
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
