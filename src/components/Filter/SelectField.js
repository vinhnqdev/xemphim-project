import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { filterActions } from "../../app/filterSlice";
import OptionField from "./OptionField";

const generateQueryString = (...filterArr) => {
  // Lọc những filters khác rỗng (có tồn tại giá trị);
  const filteredValue = filterArr.filter((filter) => filter.value !== "");
  // Thực hiện lặp để tạo queryString
  if (filteredValue.length !== 0) {
    let queryString = "/allmovies";
    filteredValue.forEach((filter, index) => {
      if (index === 0) {
        queryString += `?${filter.type}=${filter.value}`;
      } else {
        queryString += `&${filter.type}=${filter.value}`;
      }
    });
    return queryString;
  }
};

const updateLatestFieldValue = (
  genresFilter,
  countryFilter,
  yearFilter,
  durationFilter,
  sortFilter,
  type,
  value
) => {
  let genre = { type: genresFilter.type, value: genresFilter.value };
  let country = { type: countryFilter.type, value: countryFilter.value };
  let year = { type: yearFilter.type, value: yearFilter.value };
  let duration = { type: durationFilter.type, value: durationFilter.value };
  let sort = { type: sortFilter.type, value: sortFilter.value };
  if (type === "genre") {
    genre.value = value;
  }
  if (type === "country") {
    country.value = value;
  }
  if (type === "year") {
    year.value = value;
  }
  if (type === "duration") {
    duration.value = value;
  }
  if (type === "sort") {
    sort.value = value;
  }
  return {
    genre,
    country,
    year,
    duration,
    sort,
  };
};

const SelectFiled = ({
  title = "Update",
  fakeData,
  selectFormType,
  defaultValueOption = "",
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const filter = useSelector((state) => state.filter);
  const {
    genresFilter,
    countryFilter,
    yearFilter,
    durationFilter,
    sortFilter,
  } = filter;

  const changeQueryStringHandler = (e) => {
    let filterValue = e.target.value;
    dispatch(
      filterActions.updateFilters({ type: selectFormType, value: filterValue })
    );
    const { genre, country, year, duration, sort } = updateLatestFieldValue(
      genresFilter,
      countryFilter,
      yearFilter,
      durationFilter,
      sortFilter,
      selectFormType,
      filterValue
    );

    // navigate to /allmovie with queryString to filter
    history.push(generateQueryString(genre, country, year, duration, sort));
  };

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
export default SelectFiled;