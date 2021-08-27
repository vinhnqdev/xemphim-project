import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import axios from "../../api/axios";
import ItemMovie from "./ItemMovie";
import Container from "../layout/Container";

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

const ListMovie = ({
  fetchUrl,
  onTotalPages,
  onError,
  title,
  desiredAmount = 0,
  type = null,
}) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fetchUrl) return;
    setIsLoading(true);
    let unsubcribe = null;
    axios
      .get(fetchUrl)
      .then((res) => {
        setIsLoading(false);
        if (onTotalPages && res.data.page <= res.data.total_pages) {
          onTotalPages(res.data.total_pages);
        }
        if (res.data.results.length === 0) {
          unsubcribe = onError();
        }
        const data = filterMovie(res.data.results);
        const randomData = getRandomMovie(data, desiredAmount);
        setList(randomData);
      })
      .catch((error) => {
        if (onError) {
          unsubcribe = onError();
        }
        setIsLoading(false);
      });
    return unsubcribe;
  }, [fetchUrl, desiredAmount, onTotalPages, onError]);

  return (
    <Container>
      {title && <h1 className="main-title">{title}</h1>}
      {isLoading && <Loading />}
      {list.length > 0 && (
        <ul className="list-movie">
          {list?.map((movie) => (
            <ItemMovie key={movie.id} movie={movie} type={type} />
          ))}
        </ul>
      )}
    </Container>
  );
};
export default ListMovie;
