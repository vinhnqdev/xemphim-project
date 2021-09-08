import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { filterActions } from "../../app/filterSlice";
import OptionField from "./OptionField";
import queryString from "query-string";
import React from "react";

const getQueryString = (
  genresFilter,
  countryFilter,
  yearFilter,
  durationFilter,
  sortFilter,
  type,
  value
) => {
  // Clone tất cả những filters (tham số truyền vào) và tạo thành một mảng để dễ thao tác
  // Phải clone bởi vì các tham số truyền vào là các state ở Redux, vì thế không thể thay đổi giá trị các biến đó bằng phép gán
  // Đã cập nhập lên Redux khi người dùng change 1 option bất kì bằng dispatch tại changeQueryStringHandler function
  const filters = [
    { ...genresFilter },
    { ...countryFilter },
    { ...yearFilter },
    { ...durationFilter },
    { ...sortFilter },
  ];

  // Cập nhật filter giá trị mới nhất
  filters.find((filter) => filter.type === type).value = value;

  // Loại bỏ những filter có giá trị rỗng, tạo object và return
  const queryFilter = filters.filter((filter) => filter.value !== "");
  const objQuery = {};
  queryFilter.forEach((query) => {
    objQuery[query.type] = query.value;
  });
  return objQuery;
};

const SelectFiled = ({
  title = "Update",
  fakeData,
  selectFormType,
  defaultValueOption = "",
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    genresFilter,
    countryFilter,
    yearFilter,
    durationFilter,
    sortFilter,
  } = useSelector((state) => state.filter);

  // Trigger khi user thực hiện thay đổi giá trị của Select Option form
  const changeQueryStringHandler = (e) => {
    let filterValue = e.target.value;
    dispatch(
      filterActions.updateFilters({ type: selectFormType, value: filterValue })
    );

    // Hàm getQueryString trả về một object query (đã loại bỏ những key có giá trị rỗng)
    // Dùng queryString pakage để đổi object thành query để redirect tới /allmovie
    const queryObj = getQueryString(
      genresFilter,
      countryFilter,
      yearFilter,
      durationFilter,
      sortFilter,
      selectFormType,
      filterValue
    );
    const searchQuery = queryString.stringify(queryObj);
    // navigate to /allmovie with queryString to filter
    history.push({
      pathname: "/allmovies",
      search: searchQuery,
    });
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
export default React.memo(SelectFiled);
