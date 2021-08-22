import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";
import { useSelector } from "react-redux";
import DetailsNavigation from "./DetailsNavigation";

// install Swiper modules
SwiperCore.use([Navigation]);

const filerActing = (casts) => {
  if (casts) {
    return casts.filter((cast) => cast.known_for_department === "Acting");
  } else {
    return [];
  }
};

const DetailSlider = () => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);

  const casts = useSelector(
    (state) => state.details.movieDetails?.credits.cast
  );
  return (
    <div className="mySwiper__container">
      <p className="mySwiper__heading">DIỄN VIÊN</p>
      <Swiper
        slidesPerView={6}
        spaceBetween={30}
        className="mySwiper"
        navigation={{
          prevEl: navigationPrevRef.current,
          nextEl: navigationNextRef.current,
        }}
        onSwiper={(swiper) => {
          setTimeout(() => {
            swiper.params.navigation.prevEl = navigationPrevRef.current;
            swiper.params.navigation.nextEl = navigationNextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          });
        }}
      >
        {filerActing(casts).map((cast) => (
          <SwiperSlide key={cast.id}>
            <figure className="mySwiper__img">
              <img
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
          </SwiperSlide>
        ))}
      </Swiper>
      <DetailsNavigation
        navPrevRef={navigationPrevRef}
        navNextRef={navigationNextRef}
      />
    </div>
  );
};

export default DetailSlider;
