import React from "react";

import SkeletonFrame from "./SkeletonFrame";

function SkeletonItem() {
  return (
    <li className="list-movie__card">
      <div className="list-movie__link">
        <div className="list-movie__image">
          <SkeletonFrame height={"100%"} width="100%" />
        </div>

        <div className="list-movie__name">
          <SkeletonFrame height={20} />
          <SkeletonFrame />
        </div>
      </div>
    </li>
  );
}

export default SkeletonItem;
