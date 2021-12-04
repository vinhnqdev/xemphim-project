import { useState } from "react";
import { Link } from "react-router-dom";
import { createPath, truncate } from "../../assets/helperFunction/u-function";
import SkeletonFrame from "../Skeletons/SkeletonFrame";

const ItemMovie = ({ movie, type }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <li className="list-movie__card">
      <Link to={`${createPath(type, movie?.media_type)}/${movie.id}`} className="list-movie__link">
        <div className="list-movie__image">
          {!loaded && <SkeletonFrame height={"100%"} width="100%" />}
          <img
            src={
              `https://image.tmdb.org/t/p/w300/${movie.poster_path || movie.profile_path}` ||
              `https://image.tmdb.org/t/p/original/${movie.poster_path || movie.profile_path}`
            }
            alt="card"
            onLoad={handleLoad}
          />
        </div>
        <div className="list-movie__name">
          <span className="list-movie__name--vn">
            {loaded ? (
              movie?.title || movie?.name || movie?.original_name
            ) : (
              <SkeletonFrame height={20} />
            )}
          </span>
          <span className="list-movie__name--en">
            {loaded ? (
              movie.overview ? (
                truncate(movie.overview, 60)
              ) : (
                "Updating..."
              )
            ) : (
              <SkeletonFrame height={20} />
            )}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default ItemMovie;
