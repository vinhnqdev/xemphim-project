import { Fragment, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DetailsBanner from "../Details/DetailsBanner";
import DetailsPoster from "../Details/DetailsPoster";
import DetailsInformationTop from "../Details/DetailsInfomationTop";
import DetailsInformationBottom from "../Details/DetailsInformationBottom";
import { useDispatch } from "react-redux";
import { fetchMovieDetails } from "../../app/movieSlice";
import { useSelector } from "react-redux";
import Container from "../UI/Container";

const MovieDetails = () => {
  const details = useSelector((state) => state.details.movieDetails);
  const location = useLocation();
  const dispatch = useDispatch();
  // Call API at thunk function
  useEffect(() => {
    dispatch(fetchMovieDetails(location.pathname));
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
