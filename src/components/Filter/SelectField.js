import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { filterActions } from "../../app/filterSlice";
import OptionField from "./OptionField";

let urlFilter = `/allmovies?lang=vi`;
const SelectFiled = ({
  fetchUrl,
  title = "Update",
  fakeData,
  type,
  defaultValueOption = "",
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const filter = useSelector((state) => state.filter);

  const changeQueryStringHandler = (e) => {
    const value = e.target.value;
    if (type === "genre") {
      dispatch(filterActions.updateGenresFilter(value));
    }
    if (type === "country") {
      dispatch(filterActions.updateCountryFilter(value));
    }
    if (type === "years") {
      dispatch(filterActions.updateYearFilter(value));
    }
    if (type === "duration") {
      dispatch(filterActions.updateDurationFilter(value));
    }
    if (type === "sort") {
      dispatch(filterActions.updateSortFilter(value));
    }
  };

  const {
    genresFilter,
    countryFilter,
    yearFilter,
    durationFilter,
    sortFilter,
  } = filter;

  useEffect(() => {
    if (
      genresFilter ||
      countryFilter ||
      yearFilter ||
      durationFilter ||
      sortFilter
    ) {
      const queryGenre = genresFilter ? `&genre=${genresFilter}` : "";
      const queryCountry = countryFilter ? `&country=${countryFilter}` : "";
      const queryYear = yearFilter ? `&year=${yearFilter}` : "";
      const queryDuration = durationFilter ? `&duration=${durationFilter}` : "";
      const querySort = sortFilter ? `&sortBy=${sortFilter}` : "";

      history.push(
        `${urlFilter}${queryGenre}${queryCountry}${queryYear}${queryDuration}${querySort}`
      );
    }
  }, [
    filter,
    genresFilter,
    countryFilter,
    yearFilter,
    durationFilter,
    sortFilter,
    history,
  ]);

  return (
    <div className="selectfield">
      <label>{title}</label>
      <div className="selectfield__control">
        <select onChange={changeQueryStringHandler} value={defaultValueOption}>
          <option value="">--Tất cả --</option>
          {fakeData.map((data) => (
            <OptionField
              data={data}
              key={
                data.id ||
                data.iso_3166_1 ||
                data.value ||
                data.year_id ||
                data.sort_id
              }
            />
          ))}
        </select>
      </div>
    </div>
  );
};
// with_genres
// region
// with_original_language
// year
// with_runtime.gte
// with_runtime.lte

export default SelectFiled;
