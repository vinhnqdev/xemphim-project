import React from "react";

import SkeletonFrame from "./SkeletonFrame";

function SkeletonItem() {
  return (
    <li className="list-movie__card">
      <div className="list-movie__link">
        <SkeletonFrame height={300} />

        <div className="list-movie__name">
          <SkeletonFrame height={20} />
          <SkeletonFrame />
        </div>
      </div>
    </li>
  );
}

export default SkeletonItem;
