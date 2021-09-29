import { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import DetailsBanner from "./DetailsBanner";
import DetailsPoster from "./DetailsPoster";
import DetailsInformationTop from "./DetailsInfomationTop";
import DetailsInformationBottom from "./DetailsInformationBottom";
import Container from "../layout/Container";
import NotFound from "../../pages/NotFound";
import movieApi from "../../api/movieApi";
import { API_KEY } from "../../api/Api-key";
import Loading from "../UI/Loading";
import { useDetails } from "../../context/details-context";
const MovieDetails = () => {
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const { slug: id } = useParams();
  const { pathname } = location;

  const { details, updateTrailers, updateDetails } = useDetails();
  useEffect(() => {
    const params = {
      api_key: API_KEY,
      language: "vi",
      append_to_response: "credits",
    };
    const paramsVideo = {
      api_key: API_KEY,
      language: "en-US",
      append_to_response: "videos",
    };
    const type = pathname.includes("tv") ? "tv" : "movie";

    movieApi
      .getDetails(type, id, params)
      .then((res) => {
        updateDetails(res);
      })
      .catch((error) => {
        setIsError(true);
      });
    movieApi
      .getDetails(type, id, paramsVideo)
      .then((res) => {
        updateTrailers(res.videos.results);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [id, pathname]);
  if (isError) {
    return <NotFound />;
  }

  if (!details) {
    return <Loading />;
  }

  return (
    <Fragment>
      <section className="movieDetails">
        <DetailsBanner bannerUrl={details?.backdrop_path} />
        <Container>
          <div className="movieDetails__wrapper">
            <DetailsPoster posterUrl={details?.poster_path} movieId={details?.id} />
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
