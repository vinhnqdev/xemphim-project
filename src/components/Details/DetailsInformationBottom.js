import { Fragment } from "react";
import DetailSlider from "./DetailsSlider";

const reversingDate = (str) => {
  return str?.split("-").reverse().join("-");
};

const DetailsInformationBottom = ({ details }) => {
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
      <p className="movieDetails__overview">
        {details?.overview
          ? details.overview
          : "Nội dung đang được cập nhật bởi quản trị viên..."}
      </p>

      <DetailSlider />
    </Fragment>
  );
};
export default DetailsInformationBottom;
