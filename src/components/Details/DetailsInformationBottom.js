import { Fragment } from "react";
import { Route, useRouteMatch, Link } from "react-router-dom";
import DetailSlider from "./DetailsSlider";
import { countriesData } from "../../assets/fakedata/FilterData";

const reversingDate = (str) => {
  return str?.split("-").reverse().join("-");
};

const DetailsInformationBottom = ({ details }) => {
  const router = useRouteMatch();
  const country = countriesData.contries.find(
    (country) => country.iso_639_1 === details?.original_language
  );
  const directorsList = details?.credits.crew.filter(
    (crew) => crew.known_for_department === "Directing"
  );

  return (
    <Fragment>
      <ul className="movieDetails__more">
        <li>
          <span>Đạo diễn</span>
          {directorsList?.map((director, index) => (
            <Link to="/" key={index}>
              {`${director.name}`}
              {index !== directorsList.length - 1 && ","}
            </Link>
          ))}
        </li>
        <li>
          <span>Quốc tịch</span>
          <Link to="/">{country?.native_name}</Link>
        </li>
        <li>
          <span>Khởi chiếu</span>
          <p className="movieDetails__date">
            {details?.release_date
              ? reversingDate(details?.release_date)
              : reversingDate(details?.first_air_date)}
          </p>
        </li>
      </ul>
      <Route path={`${router.path}`} exact>
        <Link
          to={`${router.url}/overview`}
          className="movieDetails__toggleOverview"
        >
          See overview
        </Link>
      </Route>
      <Route path={`${router.path}/overview`}>
        <p className="movieDetails__overview">
          {details?.overview
            ? details.overview
            : "Nội dung đang được cập nhật bởi quản trị viên..."}
        </p>
      </Route>

      <DetailSlider />
    </Fragment>
  );
};
export default DetailsInformationBottom;
