import React, { Fragment } from "react";

function Credit({ cast }) {
  return (
    <Fragment>
      <figure className="mySwiper__img">
        <img
          className="mySwiper__img--credit"
          src={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/original${cast.profile_path}`
              : "https://i.imgur.com/wLJJctg.png"
          }
          alt="actor"
        />
      </figure>
      <p className="mySwiper__name"> {cast.name || cast.original_name}</p>
      <p className="mySwiper__subname">{cast.character}</p>
    </Fragment>
  );
}

export default Credit;
