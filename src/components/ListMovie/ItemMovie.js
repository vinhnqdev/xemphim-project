import { Link } from "react-router-dom";

const createPath = (mediaType, type) => {
  if (type) {
    return "/" + type;
  }
  if (mediaType === "tv") {
    return "/tv";
  }
  if (mediaType === "movie") {
    return "/movie";
  }
};

const truncate = (str, number) => {
  return str?.length < number ? str : str?.substr(0, number - 1) + "...";
};

const ItemMovie = ({ movie, type }) => {
  return (
    <li key={movie.id} className="list-movie__card">
      <Link
        to={`${createPath(type, movie?.media_type)}/${movie.id}`}
        className="list-movie__link"
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${
            movie.poster_path || movie.profile_path
          }`}
          alt="card"
        />
        <div className="list-movie__name">
          <span className="list-movie__name--vn">
            {movie?.title || movie?.name || movie?.original_name}
          </span>
          <span className="list-movie__name--en">
            {movie.overview ? truncate(movie.overview, 60) : "Updating..."}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ItemMovie;
