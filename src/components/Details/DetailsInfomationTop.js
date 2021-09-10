import { Fragment } from "react";

import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { filterActions } from "../../app/filterSlice";
import queryString from "query-string";
import { convertToYearString } from "../../assets/helperFunction/u-function";

const DetailsInformationTop = ({ details }) => {
  // convertToYearString("2021-07-28");
  const dispatch = useDispatch();
  const history = useHistory();
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

  const year_release = details?.release_date
    ? convertToYearString(details?.release_date)
    : convertToYearString(details?.first_air_date);

  return (
    <Fragment>
      <h2 className="movieDetails__title">
        {details?.original_title || details?.original_name}
      </h2>
      <h3 className="movieDetails__title-vn">
        {details?.title} (<span>{year_release}</span>)
      </h3>
      <div className="movieDetails__Labels u-mbt-small">
        <span className="movieDetails__Labels--tag">IMDb</span>
        <span className="movieDetails__Labels--rate">
          {details?.vote_average}
        </span>
      </div>
      <div className="movieDetails__links">
        <div className="movieDetails__links--collections">
          <span className="u-link-primary">
            <i className="fab fa-facebook-square"></i>Share
          </span>
          <span className="u-link-success">
            <i className="fas fa-plus"></i>Collections
          </span>
        </div>
        <ul className="movieDetails__links--genres">
          {details?.genres.map((genre) => (
            <li key={genre.id} className="movieDetails__links--genre">
              <span href="#" onClick={() => filterByGenreIdHandler(genre.id)}>
                {genre.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default DetailsInformationTop;
