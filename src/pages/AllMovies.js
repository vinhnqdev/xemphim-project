import { useSelector } from "react-redux";
import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";
import { useLocation } from "react-router-dom";
import { API_KEY } from "../api/Api-key";
import { countriesData } from "../assets/fakedata/FilterData";
import Pagination from "../components/Pagination/Pagination";
import usePagination from "../hooks/use-pagination";
import { parseParams } from "../assets/helperFunction/u-function";
import movieApi from "../api/movieApi";
const getISO639 = (ISO3166) => {
  const retrievedCountry = countriesData.list.find((country) => country.iso_3166_1 === ISO3166);
  return retrievedCountry.iso_639_1;
};
const handleQueryDuration = (durationStr) => {
  if (!durationStr)
    return {
      lt: "",
      gt: "",
    };
  if (durationStr === "0-60") {
    return {
      lt: 60,
      gt: "",
    };
  }
  if (durationStr === "60-90") {
    return {
      lt: 90,
      gt: 60,
    };
  }
  if (durationStr === "90-120") {
    return {
      lt: 120,
      gt: 90,
    };
  }
  if (durationStr === "120-150") {
    return {
      lt: 150,
      gt: 120,
    };
  }
  if (durationStr === "150-0") {
    return {
      lt: "",
      gt: 150,
    };
  }
};
const handleQueryYear = (year) => {
  if (year === 2009) {
    return {
      lt: "2009-12-31",
      gt: "",
    };
  }
  if (year) {
    return {
      lt: `${year}-12-31`,
      gt: `${year}-01-01`,
    };
  }
  return {
    lt: "",
    gt: "",
  };
};
const handleQueryCountry = (country) => {
  if (country) {
    const ISO639 = getISO639(country);
    return ISO639;
  } else {
    return "";
  }
};
const handleQuerySortBy = (sort) => {
  if (sort) {
    if (sort === "popularity") {
      return "popularity.desc";
    }
    if (sort === "published") {
      return "primary_release_date.desc";
    }
    if (sort === "voted") {
      return "vote_average.desc";
    }
  } else {
    return "";
  }
};
const getParams = (genre, country, year, duration, sort, page) => {
  return {
    api_key: API_KEY,
    language: "vi",
    include_adult: false,
    with_genres: genre ? genre : "",
    with_original_language: handleQueryCountry(country),
    "primary_release_date.lte": handleQueryYear(year).lt,
    "primary_release_date.gte": handleQueryYear(year).gt,
    "with_runtime.lte": handleQueryDuration(duration).lt,
    "with_runtime.gte": handleQueryDuration(duration).gt,
    sort_by: handleQuerySortBy(sort),
    page: page,
  };
};

const AllMovie = () => {
  // Handle Filters
  const filters = useSelector((state) => state.filter);
  const isColumnList = useSelector((state) => state.movie.isColumnList);

  const location = useLocation();
  const queryObj = parseParams(location.search);
  const { genre, country, year, duration, sort } = queryObj;

  // Handle Paginations
  const { page, totalPages, hasError, totalPagesHandler, errorHandler } = usePagination(false);
  if (hasError) {
    return <p>Không tìm thấy phim bạn yêu cầu, xin vui lòng thử lại</p>;
  }
  return (
    <section className="allmovie">
      <div className="container">
        <Filter filters={filters} />
        <ListMovie
          api={movieApi.getMovieWithFilter}
          params={getParams(genre, country, year, duration, sort, page)}
          type="movie"
          desiredAmount={20}
          onError={errorHandler}
          onTotalPages={totalPagesHandler}
          isColumnList={isColumnList}
        />
        <Pagination currentPage={+page} totalPages={totalPages} />
      </div>
    </section>
  );
};
export default AllMovie;
