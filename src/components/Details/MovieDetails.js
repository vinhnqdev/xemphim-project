import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailsBanner from "./DetailsBanner";
import DetailsPoster from "./DetailsPoster";
import DetailsInformationTop from "./DetailsInfomationTop";
import DetailsInformationBottom from "./DetailsInformationBottom";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../../app/movieSlice";
import { useSelector } from "react-redux";
import Container from "../layout/Container";

const MovieDetails = () => {
  const details = useSelector((state) => state.details.movieDetails);
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    // Call API at thunk function
    // Thunk chỉ yêu cầu đường dẫn /tv/id và /movie/id nên phải xử lý loại bỏ các path đằng sau trước khi gọi API
    // ở đây có nested route /.../id/overview nên cần tiến hành cắt bỏ path trước khi call API
    const index = location.pathname.indexOf("/overview");
    const pathAPI =
      index === -1 ? location.pathname : location.pathname.slice(0, index);
    dispatch(fetchMovieDetails(pathAPI));
  }, [dispatch, location.pathname]);
  return (
    <Fragment>
      <section className="movieDetails">
        <DetailsBanner bannerUrl={details?.backdrop_path} />
        <Container>
          <div className="movieDetails__wrapper">
            <DetailsPoster posterUrl={details?.poster_path} />
            <div className="movieDetails__information">
              <DetailsInformationTop details={details} />
              <DetailsInformationBottom details={details} />
            </div>
          </div>
        </Container>
      </section>
    </Fragment>
  );
};
export default MovieDetails;
