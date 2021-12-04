import { Swiper, SwiperSlide } from "swiper/react";
import React, { Fragment, useState } from "react";
// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
// import Swiper core and required modules
import SwiperCore, { Navigation } from "swiper/core";
import DetailsNavigation from "./DetailsNavigation";
import IframeModal from "./IframeModal";
import Credit from "./Item/Credit";
import Thumbnail from "./Item/Thumbnail";
import { useDetails } from "../../context/details-context";

// install Swiper modules
SwiperCore.use([Navigation]);

const filerActing = (casts) => {
  if (casts) {
    return casts.filter((cast) => cast.known_for_department === "Acting");
  } else {
    return [];
  }
};

const creditsSlideBreakPoints = {
  400: {
    slidesPerView: 3,
  },
  768: {
    slidesPerView: 4,
  },
  900: {
    slidesPerView: 5,
  },
  1200: {
    slidesPerView: 6,
  },
};

const videosSlideBreakPoints = {
  600: {
    slidesPerView: 2,
  },
  1200: {
    slidesPerView: 3,
  },
};

const DetailSlider = ({ type }) => {
  const navigationPrevRef = React.useRef(null);
  const navigationNextRef = React.useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [keyYoutube, setKeyYoutube] = useState(null);
  const { trailers: videos, details } = useDetails();
  const casts = details?.credits.cast;
  const clickThumbnailsHandler = (e) => {
    let element = e.target;
    if (element.localName !== "img") {
      element = element.firstChild;
    }
    setIsVideoOpen(true);
    setKeyYoutube(element.alt);
  };
  return (
    <Fragment>
      <IframeModal isOpen={isVideoOpen} onOpen={() => setIsVideoOpen(false)} idFrame={keyYoutube} />
      <div className="mySwiper__container">
        <p className="mySwiper__heading">{type === "credits" ? "DIỄN VIÊN" : "TRAILERS"}</p>
        <Swiper
          slidesPerView={type === "credits" ? 2 : 1}
          breakpoints={type === "credits" ? creditsSlideBreakPoints : videosSlideBreakPoints}
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
          {type === "credits" &&
            filerActing(casts).map((cast) => (
              <SwiperSlide key={`${cast.id}_${cast.order}`}>
                <Credit cast={cast} />
              </SwiperSlide>
            ))}

          {type === "videos" &&
            videos?.map((video) => (
              <SwiperSlide key={video.key}>
                <Thumbnail video={video} onClick={clickThumbnailsHandler} />
              </SwiperSlide>
            ))}
        </Swiper>
        <DetailsNavigation navPrevRef={navigationPrevRef} navNextRef={navigationNextRef} />
      </div>
    </Fragment>
  );
};

export default DetailSlider;
