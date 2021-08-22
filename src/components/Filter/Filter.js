import SelectField from "./SelectField";
import IconField from "./IconField";
import Container from "../../layout/Container";
import requests from "../../../api/Requests";
import {
  countriesData,
  yearsData,
  durationData,
} from "../../../assets/fakedata/FilterData";
const Filter = () => {
  return (
    <Container>
      <div className="filter">
        <SelectField
          title="Thể loại"
          fetchUrl={requests.filterByGenresRequest}
        />
        <SelectField title="Quốc Gia" fakeData={countriesData} />
        <SelectField title="Năm" fakeData={yearsData} />
        <SelectField title="Thời lượng" fakeData={durationData} />
        <SelectField />
        <IconField />
      </div>
    </Container>
  );
};
export default Filter;
