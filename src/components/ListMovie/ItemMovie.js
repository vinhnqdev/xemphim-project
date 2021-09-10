import { Link } from "react-router-dom";
import { createPath, truncate } from "../../assets/helperFunction/u-function";

const ItemMovie = ({ movie, type }) => {
  return (
    <li key={movie.id} className="list-movie__card">
      <Link
        to={`${createPath(type, movie?.media_type)}/${movie.id}`}
        className="list-movie__link"
      >
        <img
          src={
            `https://image.tmdb.org/t/p/w500/${
              movie.poster_path || movie.profile_path
            }` ||
            `https://image.tmdb.org/t/p/original/${
              movie.poster_path || movie.profile_path
            }`
          }
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
