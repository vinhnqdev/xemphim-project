import { Fragment } from "react";

const DetailsNavigation = ({ navPrevRef, navNextRef }) => {
  return (
    <Fragment>
      <div ref={navPrevRef} className="mySwiper__arrow-left">
        <i className="fas fa-chevron-left"></i>
      </div>
      <div ref={navNextRef} className="mySwiper__arrow-right">
        <i className="fas fa-chevron-right"></i>
      </div>
    </Fragment>
  );
};
export default DetailsNavigation;
