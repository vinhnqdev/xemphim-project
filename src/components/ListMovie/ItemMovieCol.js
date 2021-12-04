import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { API_KEY } from "../../api/Api-key";
import movieApi from "../../api/movieApi";
import { filterActions } from "../../app/filterSlice";
import { countriesData } from "../../assets/fakedata/FilterData";
import { convertToYearString, createPath, truncate } from "../../assets/helperFunction/u-function";
import SkeletonFrame from "../Skeletons/SkeletonFrame";
import SkeletonItemCol from "../Skeletons/SkeletonItemCol";

function ItemMovieCol({ type, id, movie }) {
  const [numsOfText, setNumsOfText] = useState(300);
  const [isLoaded, setIsLoaded] = useState(false);
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();
  const year_release = details?.release_date
    ? convertToYearString(details?.release_date)
    : convertToYearString(details?.first_air_date);
  const country = countriesData.list.find(
    (country) => country.iso_639_1 === details?.original_language
  );

  const filterByGenreIdHandler = (genreId) => {
    // console.log(genreId);
    dispatch(filterActions.resetFilter());
    dispatch(filterActions.updateFilters({ type: "genre", value: genreId }));
    const searchQuery = queryString.stringify({ genre: genreId });

    history.push({
      pathname: "/allmovies",
      search: searchQuery,
    });
  };

  const scrollHandler = () => {
    if (window.innerWidth < 600) {
      setNumsOfText(100);
    } else {
      setNumsOfText(300);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", scrollHandler);
    return () => {
      scrollHandler();
    };
  }, []);

  useEffect(() => {
    const params = {
      api_key: API_KEY,
      language: "vi",
    };
    setIsLoading(true);
    movieApi
      .getDetails(type || movie.media_type, id, params)
      .then((data) => {
        setDetails(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, [id, type, movie]);

  const pageRedirectionHandler = () => {
    history.push(`${createPath(type, movie?.media_type)}/${movie.id}`);
  };

  // details?.overview
  const renderContent = (details) => {
    if (!details) return;
    if (details.overview) {
      return truncate(details.overview, numsOfText);
    } else {
      return "Nội dung đang được cập nhật bởi quản trị viên...";
    }
  };

  const handleLoaded = () => {
    setIsLoaded(true);
  };

  if (isLoading) return <SkeletonItemCol key={id} />;

  return (
    <li className="col-movie__card">
      {/* Image */}
      <div className="col-movie__image" onClick={pageRedirectionHandler}>
        {!isLoaded && <SkeletonFrame height={225} width="100%" />}
        <img
          src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
          alt=""
          onLoad={handleLoaded}
        />
      </div>

      {/* Content */}

      <div className="col-movie__content">
        {/* Top */}
        <div className="col-movie__contentTop">
          {/* Top Left */}
          <div className="contentTop__left">
            <div className="contentTop__left--name" onClick={pageRedirectionHandler}>
              {isLoaded ? (
                movie?.title || movie?.name || movie?.original_name
              ) : (
                <SkeletonFrame width={220} />
              )}
            </div>
            <div className="contentTop__left--year">
              {isLoaded ? year_release : <SkeletonFrame width={60} />}
            </div>
          </div>

          {/* Top Right */}
          <div className="contentTop__right">
            <div className="contentTop__right--duration">
              {isLoaded ? `${details?.runtime || 96} phút` : <SkeletonFrame width={70} />}
            </div>
            <div className="contentTop__right--country">
              {isLoaded ? country?.native_name : <SkeletonFrame />}
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="col-movie__contentMiddle">
          <div className="contentMiddle__overview">
            {isLoaded ? renderContent(movie) : <SkeletonFrame count={2} width="100%" />}
          </div>
        </div>

        {/* Bottom */}
        <div className="col-movie__contentBottom">
          {/* Bottom Right*/}
          <div className="contentBottom__right">
            {isLoaded ? (
              <>
                <span className="movieDetails__Labels--tag">IMDb</span>
                <span className="contentBottom__right--vote">{details?.vote_average}</span>
              </>
            ) : (
              <>
                <SkeletonFrame width={60} />
                <SkeletonFrame width={60} />
              </>
            )}
          </div>
          {/* Bottom Left*/}

          {isLoaded ? (
            <ul className="contentBottom__left">
              {details.genres?.map((genre) => {
                return (
                  <li key={genre.id} className="contentBottom__left--genre">
                    <span onClick={() => filterByGenreIdHandler(genre.id)}>{genre.name}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <SkeletonFrame width={220} height={20} />
          )}
        </div>
      </div>
    </li>
  );
}

export default ItemMovieCol;
