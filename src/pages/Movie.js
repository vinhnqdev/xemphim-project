import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import requests from "../api/Requests";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../app/filterSlice";
const Movie = () => {
  const dispatch = useDispatch();
  dispatch(filterActions.resetFilter());
  const filters = useSelector((state) => state.filter);
  return (
    <section className="movie">
      <div className="container">
        <TitleMovie title="Movies" />
        <Filter filters={filters} />
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
