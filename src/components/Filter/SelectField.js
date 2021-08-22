import { useState } from "react";
import { useEffect } from "react";
import axios from "../../api/axios";
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
  return (
    <div className="selectfield">
      <label>{title}</label>
      <div className="selectfield__control">
        <select name="genres">
          <option value>--Tất cả --</option>
          {dataField.map((data) => (
            <option
              key={data.id || data.iso_3166_1 || data.value || data}
              value={data.id || data.iso_3166_1 || data.value || data}
            >
              {data.name || data.native_name || data.durationTitle || data}
            </option>
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
