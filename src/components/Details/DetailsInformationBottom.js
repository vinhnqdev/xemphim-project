import { Fragment } from "react";
import { Route, useRouteMatch, Link } from "react-router-dom";
import DetailSlider from "./DetailsSlider";

const reversingDate = (str) => {
  return str?.split("-").reverse().join("-");
};

const DetailsInformationBottom = ({ details }) => {
  const router = useRouteMatch();

  return (
    <Fragment>
      <ul className="movieDetails__more">
        <li>
          <span>Đạo diễn</span>
          <a href="">Robert Schewen</a>
        </li>
        <li>
          <span>Quốc tịch</span>
          <a href="">Canada,</a>
          <a href="">Mỹ</a>
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
