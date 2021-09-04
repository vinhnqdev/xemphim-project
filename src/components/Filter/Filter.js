import SelectField from "./SelectField";
import IconField from "./IconField";

import {
  genresData,
  countriesData,
  yearsData,
  durationData,
  sortData,
} from "../../assets/fakedata/FilterData";
import Container from "../layout/Container";

const getFilterByType = (filters, type) => {
  for (let key in filters) {
    if (filters[key].type === type) {
      return filters[key];
    }
  }
};

const Filter = ({ filters = "" }) => {
  const optionsData = [
    genresData,
    countriesData,
    yearsData,
    durationData,
    sortData,
  ];
  return (
    <Container>
      <div className="filter">
        {optionsData?.map((data) => (
          <SelectField
            key={data.type}
            title={data.title}
            fakeData={data.list}
            selectFormType={getFilterByType(filters, data.type).type}
            defaultValueOption={
              filters && getFilterByType(filters, data.type).value
            }
          />
        ))}
        <IconField />
      </div>
    </Container>
  );
};
export default Filter;
