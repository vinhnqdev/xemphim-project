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
          selectFormType={filters.genresFilter.type}
          defaultValueOption={filters && filters.genresFilter.value}
        />
        <SelectField
          title="Quốc Gia"
          fakeData={countriesData.contries}
          selectFormType={filters.countryFilter.type}
          defaultValueOption={filters && filters.countryFilter.value}
        />
        <SelectField
          title="Năm"
          fakeData={yearsData.years}
          selectFormType={filters.yearFilter.type}
          defaultValueOption={filters && filters.yearFilter.value}
        />
        <SelectField
          title="Thời lượng"
          fakeData={durationData.durations}
          selectFormType={filters.durationFilter.type}
          defaultValueOption={filters && filters.durationFilter.value}
        />
        <SelectField
          title="Sắp xếp"
          fakeData={sortData.sorts}
          selectFormType={filters.sortFilter.type}
          defaultValueOption={filters && filters.sortFilter.value}
        />
        <IconField />
      </div>
    </Container>
  );
};
export default Filter;
