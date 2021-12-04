import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Container from "../layout/Container";
import SkeletonItem from "../Skeletons/SkeletonItem";
import SkeletonItemCol from "../Skeletons/SkeletonItemCol";
import ItemMovie from "./ItemMovie";
import ItemMovieCol from "./ItemMovieCol";

// Filter an Array to get rid of the element with backdrop_path === null
const filterMovie = (movies) => {
  return movies?.filter((movie) => movie.poster_path !== null && movie.profile_path !== null);
};

const getRandomMovie = (movies, desiredNumber) => {
  const arr = [];
  if (desiredNumber >= movies.length) {
    return movies;
  }
  for (let i = 0; i < desiredNumber; i++) {
    const randomMovie = movies[Math.floor(Math.random() * (movies?.length - 1))];
    const isCheckDuplicateMovie = arr.find((movie) => movie?.id === randomMovie?.id);
    if (isCheckDuplicateMovie) {
      desiredNumber++;
      continue;
    }
    arr.push(randomMovie);
  }
  return arr;
};

const ListMovie = ({
  api,
  params,
  onTotalPages,
  onError,
  title,
  desiredAmount = 0,
  type = null,
  isColumnList = false,
}) => {
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  // const isLoading = useSelector((state) => state.movie.loading);

  useEffect(() => {
    let unsubcribe = null;
    let loadingTimer = null;
    const fetchMovieList = async () => {
      try {
        setIsLoading(true);
        const response = await api(params);
        if (onTotalPages && response.page <= response.total_pages) {
          onTotalPages(response.total_pages);
        }
        if (response.results.length === 0) {
          unsubcribe = onError();
        }
        const data = filterMovie(response.results);
        const randomData = getRandomMovie(data, desiredAmount);
        setList(randomData);
        setIsLoading(false);
      } catch {
        if (onError) {
          unsubcribe = onError();
          setIsLoading(false);
        }
      }
    };
    fetchMovieList();
    return () => {
      if (unsubcribe) {
        unsubcribe();
      }
      if (loadingTimer) {
        clearTimeout(loadingTimer);
      }
    };
  }, [api, params, desiredAmount, onTotalPages, onError, dispatch]);

  return (
    <Container>
      {title && <h1 className="main-title">{title}</h1>}

      <ul className={`list-movie ${isColumnList && "list-column"}`}>
        {list.length === 0 || isLoading
          ? Array(15)
              .fill()
              .map((x, idx) => {
                if (isColumnList) {
                  return <SkeletonItemCol key={idx} />;
                } else {
                  return <SkeletonItem key={idx} />;
                }
              })
          : list?.map((movie) => {
              if (isColumnList) {
                return <ItemMovieCol key={movie.id} id={movie.id} type={type} movie={movie} />;
              } else {
                return <ItemMovie key={movie.id} movie={movie} type={type} />;
              }
            })}
      </ul>
    </Container>
  );
};
export default ListMovie;
