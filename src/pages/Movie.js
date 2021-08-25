import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import requests from "../api/Requests";
import { useDispatch } from "react-redux";
import { filterActions } from "../app/filterSlice";
const Movie = () => {
  const dispatch = useDispatch();
  dispatch(filterActions.resetFilter());
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
