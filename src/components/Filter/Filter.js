import SelectField from "./SelectField";
import IconField from "./IconField";
import requests from "../../api/Requests";
import {
  countriesData,
  yearsData,
  durationData,
} from "../../assets/fakedata/FilterData";
import Container from "../layout/Container";
const Filter = () => {
  return (
    <Container>
      <div className="filter">
        hello
        {/* <SelectField
          title="Thể loại"
          fetchUrl={requests.filterByGenresRequest}
        />
        <SelectField title="Quốc Gia" fakeData={countriesData} />
        <SelectField title="Năm" fakeData={yearsData} />
        <SelectField title="Thời lượng" fakeData={durationData} />
        <SelectField />
        <IconField /> */}
      </div>
    </Container>
  );
};
export default Filter;
