import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
const truncate = (str, number) => {
  return str?.length < number ? str : str?.substr(0, number - 1) + "...";
};

// Filter an Array to get rid of the element with backdrop_path === null
const filterMovie = (movies) => {
  return movies?.filter(
    (movie) => movie.poster_path !== null && movie.profile_path !== null
  );
};

const getRandomMovie = (movies, desiredNumber) => {
  const arr = [];
  if (desiredNumber >= movies.length) {
    return movies;
  }
  for (let i = 0; i < desiredNumber; i++) {
    const randomMovie =
      movies[Math.floor(Math.random() * (movies?.length - 1))];
    const isCheckDuplicateMovie = arr.find(
      (movie) => movie?.id === randomMovie?.id
    );
    if (isCheckDuplicateMovie) {
      desiredNumber++;
      continue;
    }
    arr.push(randomMovie);
  }
  return arr;
};

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

const ListMovie = ({ fetchUrl, title, desiredAmount = 0, type = null }) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fetchUrl) return;
    setIsLoading(true);
    axios
      .get(fetchUrl)
      .then((res) => {
        setIsLoading(false);
        const data = filterMovie(res.data.results);
        const randomData = getRandomMovie(data, desiredAmount);
        setList(randomData);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [fetchUrl, desiredAmount]);

  return (
    <div className="container">
      {title && <h1 className="main-title">{title}</h1>}
      {isLoading && <Loading />}
      <ul className="list-movie">
        {list?.map((movie) => (
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
                  {movie.overview
                    ? truncate(movie.overview, 60)
                    : "Updating..."}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ListMovie;
