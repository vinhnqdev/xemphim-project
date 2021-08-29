import { Fragment, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
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
  const { slug: id } = useParams();

  useEffect(() => {
    // Call API at thunk function
    dispatch(fetchMovieDetails(location.pathname, id));
  }, [dispatch, location.pathname, id]);
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
