import { useEffect, useState } from "react";
import ItemMovie from "./ItemMovie";
import Container from "../layout/Container";
import ItemMovieCol from "./ItemMovieCol";

// Filter an Array to get rid of the element with backdrop_path === null
const filterMovie = (movies) => {
  return movies?.filter(
    (movie) => movie.poster_path !== null && movie.profile_path !== null
  );
};

// const getRandomMovie = (movies, desiredNumber) => {
//   const arr = [];
//   if (desiredNumber >= movies.length) {
//     return movies;
//   }
//   for (let i = 0; i < desiredNumber; i++) {
//     const randomMovie =
//       movies[Math.floor(Math.random() * (movies?.length - 1))];
//     const isCheckDuplicateMovie = arr.find(
//       (movie) => movie?.id === randomMovie?.id
//     );
//     if (isCheckDuplicateMovie) {
//       desiredNumber++;
//       continue;
//     }
//     arr.push(randomMovie);
//   }
//   return arr;
// };

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

  useEffect(() => {
    let unsubcribe = null;

    const fetchMovieList = async () => {
      try {
        const response = await api(params);

        if (onTotalPages && response.page <= response.total_pages) {
          onTotalPages(response.total_pages);
        }
        if (response.results.length === 0) {
          unsubcribe = onError();
        }
        const data = filterMovie(response.results);
        // const randomData = getRandomMovie(data, desiredAmount);
        setList(data);
      } catch {
        if (onError) {
          unsubcribe = onError();
        }
      }
    };
    fetchMovieList();
    return unsubcribe;
  }, [api, params, desiredAmount, onTotalPages, onError]);

  return (
    <Container>
      {title && <h1 className="main-title">{title}</h1>}
      {/* {isLoading && <Loading />} */}
      {list.length > 0 && (
        <ul className={`list-movie ${isColumnList && "list-column"}`}>
          {list?.map((movie) => {
            if (isColumnList) {
              return (
                <ItemMovieCol
                  key={movie.id}
                  id={movie.id}
                  type={type}
                  movie={movie}
                />
              );
            } else {
              return <ItemMovie key={movie.id} movie={movie} type={type} />;
            }
          })}
        </ul>
      )}
    </Container>
  );
};
export default ListMovie;
