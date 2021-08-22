import { Fragment } from "react";

const DetailsInformationTop = ({ details }) => {
  const year_release = details?.release_date
    ? details?.release_date?.substr(0, 4)
    : details?.first_air_date?.substr(0, 4);

  return (
    <Fragment>
      <h2 className="movieDetails__title">
        {details?.original_title || details?.original_name}
      </h2>
      <h3 className="movieDetails__title-vn">
        {details?.title} (<a href="https://google.com">{year_release}</a>)
      </h3>
      <div className="movieDetails__Labels u-mbt-small">
        <span className="movieDetails__Labels--tag">IMDb</span>
        <span className="movieDetails__Labels--rate">
          {details?.vote_average}
        </span>
      </div>
      <div className="movieDetails__links">
        <div className="movieDetails__links--collections">
          <a href="" className="u-link-primary">
            <i className="fab fa-facebook-square"></i>Share
          </a>
          <a href="" className="u-link-success">
            <i className="fas fa-plus"></i>Collections
          </a>
        </div>
        <ul className="movieDetails__links--genres">
          {details?.genres.map((genre) => (
            <li key={genre.id} className="movieDetails__links--genre">
              <a href="#">{genre.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

export default DetailsInformationTop;
