import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import requests from "../api/Requests";
import { useLocation } from "react-router-dom";
import { API_KEY } from "../api/Requests";
import { countriesData } from "../assets/fakedata/FilterData";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";

const getISO639 = (ISO3166) => {
  const retrievedCountry = countriesData.contries.find(
    (country) => country.iso_3166_1 === ISO3166
  );
  return retrievedCountry.iso_639_1;
};
const parseParams = (querystring) => {
  // parse query string
  const params = new URLSearchParams(querystring);
  const obj = {};
  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
};
const handleQueryDuration = (durationStr) => {
  if (!durationStr) return "";
  if (durationStr === "0-60") {
    return "&with_runtime.lte=" + 60;
  }
  if (durationStr === "60-90") {
    return "&with_runtime.gte=" + 60 + "&with_runtime.lte=" + 90;
  }
  if (durationStr === "90-120") {
    return "&with_runtime.gte=" + 90 + "&with_runtime.lte=" + 120;
  }
  if (durationStr === "120-150") {
    return "&with_runtime.gte=" + 120 + "&with_runtime.lte=" + 150;
  }
  if (durationStr === "150-0") {
    return "&with_runtime.gte=" + 150;
  }
};
const handleQueryYear = (year) => {
  if (year === 2009) {
    return `&primary_release_date.lte=2009-12-31`;
  }
  if (year) {
    return `&primary_release_date.gte=${year}-01-01&primary_release_date.lte=${year}-12-31`;
  } else {
    return "";
  }
};
const handleQueryCountry = (country) => {
  if (country) {
    const ISO639 = getISO639(country);
    return `&with_original_language=${ISO639}`;
  } else {
    return "";
  }
};
const handleQuerySortBy = (sort) => {
  if (sort) {
    if (sort === "popularity") {
      return `&sort_by=popularity.desc`;
    }
    if (sort === "published") {
      return `&sort_by=primary_release_date.desc`;
    }
    if (sort === "voted") {
      return `&sort_by=vote_average.desc`;
    }
  } else {
    return "";
  }
};
const generatePropertyUrl = (genre, country, year, duration, sort) => {
  if (genre || country || year || duration || sort) {
    const queryGenre = genre ? `&with_genres=${genre}` : "";
    const queryCountry = handleQueryCountry(country);
    const queryYear = handleQueryYear(year);
    const queryDuration = handleQueryDuration(duration);
    const querySort = handleQuerySortBy(sort);
    return `/discover/movie?api_key=${API_KEY}&language=vi&include_adult=false${queryGenre}${queryCountry}${queryYear}${queryDuration}${querySort}`;
  }
};

const AllMovie = () => {
  const [totalPages, setTotalPages] = useState(null);
  const [isError, setIsError] = useState(false);

  // Handle Filters

  let fetchUrl = null;
  const filters = useSelector((state) => state.filter);
  const location = useLocation();
  const queryObj = parseParams(location.search);
  const { genre, country, year, duration, sortBy } = queryObj;
  fetchUrl = generatePropertyUrl(genre, country, year, duration, sortBy);

  // Handle Paginations

  let { page } = queryObj;

  if (page === undefined) {
    page = 1;
  }

  if (isNaN(+page) || isError) {
    return <p>Không tìm thấy phim bạn yêu cầu, xin vui lòng thử lại</p>;
  }

  const totalPagesHandler = (totalPages) => {
    setTotalPages(totalPages);
  };
  const errorHandler = () => {
    setIsError(true);
  };

  return (
    <section className="allmovie">
      <div className="container">
        <Filter filters={filters} />
        <ListMovie
          fetchUrl={
            fetchUrl ? fetchUrl + `&page=${page}` : requests.moviePupularRequest
          }
          type="movie"
          desiredAmount={20}
          onError={errorHandler}
          onTotalPages={totalPagesHandler}
        />
        <Pagination currentPage={+page} totalPages={totalPages} />
      </div>
    </section>
  );
};
export default AllMovie;
