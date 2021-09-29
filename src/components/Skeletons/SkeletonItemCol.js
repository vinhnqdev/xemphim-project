import React from "react";
import SkeletonFrame from "./SkeletonFrame";

function SkeletonItemCol() {
  return (
    <li className="col-movie__card">
      {/* Image */}
      <div className="col-movie__image">
        <SkeletonFrame width={160} height={225} />
      </div>

      {/* Content */}

      <div className="col-movie__content">
        {/* Top */}
        <div className="col-movie__contentTop">
          {/* Top Left */}
          <div className="contentTop__left">
            <div className="contentTop__left--name">
              <SkeletonFrame width={220} />
            </div>
            <div className="contentTop__left--year">
              <SkeletonFrame width={60} />
            </div>
          </div>

          {/* Top Right */}
          <div className="contentTop__right">
            <div className="contentTop__right--duration">
              <SkeletonFrame width={70} />
            </div>
            <div className="contentTop__right--country">
              <SkeletonFrame />
            </div>
          </div>
        </div>

        {/* Middle */}
        <div className="col-movie__contentMiddle">
          <div className="contentMiddle__overview">
            <SkeletonFrame count={2} width="100%" />
          </div>
        </div>

        {/* Bottom */}
        <div className="col-movie__contentBottom">
          {/* Bottom Right*/}
          <div className="contentBottom__right">
            <>
              <SkeletonFrame width={60} />
              <SkeletonFrame width={60} />
            </>
          </div>
          {/* Bottom Left*/}

          <SkeletonFrame width={220} height={20} />
        </div>
      </div>
    </li>
  );
}

export default SkeletonItemCol;
