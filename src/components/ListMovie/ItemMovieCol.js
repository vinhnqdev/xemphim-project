import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { API_KEY } from "../../api/Api-key";
import movieApi from "../../api/movieApi";
import { filterActions } from "../../app/filterSlice";
import { countriesData } from "../../assets/fakedata/FilterData";
import queryString from "query-string";
import {
  convertToYearString,
  createPath,
  truncate,
} from "../../assets/helperFunction/u-function";

function ItemMovieCol({ type, id, movie }) {
  const [numsOfText, setNumsOfText] = useState(300);
  const [details, setDetails] = useState({});
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
    console.log(searchQuery);
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
    movieApi
      .getDetails(type || movie.media_type, id, params)
      .then((data) => setDetails(data))
      .catch((error) => console.log("LỖI GÌ ĐÂY"));
  }, [id, type, movie]);

  const pageRedirectionHandler = () => {
    history.push(`${createPath(type, movie?.media_type)}/${movie.id}`);
  };

  return (
    <li className="col-movie__card">
      {/* Image */}
      <div className="col-movie__image" onClick={pageRedirectionHandler}>
        <img
          src={`https://image.tmdb.org/t/p/w342/${details.poster_path}`}
          alt=""
        />
      </div>

      {/* Content */}

      <div className="col-movie__content">
        {/* Top */}
        <div className="col-movie__contentTop">
          {/* Top Left */}
          <div className="contentTop__left">
            <div
              className="contentTop__left--name"
              onClick={pageRedirectionHandler}
            >
              {details?.title || details?.name || details?.original_name}
            </div>
            <div className="contentTop__left--year">({year_release})</div>
          </div>

          {/* Top Right */}
          <div className="contentTop__right">
            <div className="contentTop__right--duration">{`${
              details?.runtime || 96
            } phút`}</div>
            <div className="contentTop__right--country">
              {country?.native_name}
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="col-movie__contentMiddle">
          <p className="contentMiddle__overview">
            {details?.overview
              ? truncate(details.overview, numsOfText)
              : "Nội dung đang được cập nhật bởi quản trị viên..."}
          </p>
        </div>

        {/* Bottom */}
        <div className="col-movie__contentBottom">
          {/* Bottom Right*/}
          <div className="contentBottom__right">
            <span className="movieDetails__Labels--tag">IMDb</span>
            <span className="contentBottom__right--vote">
              {details?.vote_average}
            </span>
          </div>
          {/* Bottom Left*/}

          <ul className="contentBottom__left">
            {details.genres?.map((genre) => (
              <li key={genre.id} className="contentBottom__left--genre">
                <span onClick={() => filterByGenreIdHandler(genre.id)}>
                  {genre.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default ItemMovieCol;