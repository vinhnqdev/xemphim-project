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

const Filter = ({ filters = "" }) => {
  return (
    <Container>
      <div className="filter">
        <SelectField
          title="Thể loại"
          fakeData={genresData.genres}
          type={genresData.type}
          defaultValueOption={filters && filters.genresFilter}
        />
        <SelectField
          title="Quốc Gia"
          fakeData={countriesData.contries}
          type={countriesData.type}
          defaultValueOption={filters && filters.countryFilter}
        />
        <SelectField
          title="Năm"
          fakeData={yearsData.years}
          type={yearsData.type}
          defaultValueOption={filters && filters.yearFilter}
        />
        <SelectField
          title="Thời lượng"
          fakeData={durationData.durations}
          type={durationData.type}
          defaultValueOption={filters && filters.durationFilter}
        />
        <SelectField
          title="Sắp xếp"
          fakeData={sortData.sorts}
          type={sortData.type}
          defaultValueOption={filters && filters.sortFilter}
        />
        <IconField />
      </div>
    </Container>
  );
};
export default Filter;
