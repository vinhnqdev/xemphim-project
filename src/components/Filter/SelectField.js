import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/axios";
import OptionField from "./OptionField";
const SelectFiled = ({ fetchUrl, title = "Update", fakeData }) => {
  const [dataField, setDataField] = useState([]);

  useEffect(() => {
    if (fakeData) {
      setDataField(fakeData);
    }
    if (fetchUrl) {
      axios
        .get(fetchUrl)
        .then((res) => {
          setDataField(res.data.genres);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [fetchUrl, setDataField, fakeData]);

  const changeQueryStringHandler = (e) => {
    // set value of each field has a prefix represent for its type
    // console.log(e.target.value);
  };

  return (
    <div className="selectfield">
      <label>{title}</label>
      <div className="selectfield__control">
        <select name="genres" onChange={changeQueryStringHandler}>
          <option value>--Tất cả --</option>
          {dataField.map((data) => (
            <OptionField
              data={data}
              key={data.id || data.iso_3166_1 || data.value || data}
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
