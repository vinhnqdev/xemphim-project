import MovieDetails from "../components/Details/MovieDetails";
import { DetailsProvider } from "../context/details-context";

const MovieDetail = () => {
  return (
    <DetailsProvider>
      <MovieDetails />
    </DetailsProvider>
  );
};
export default MovieDetail;
