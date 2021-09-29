import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonFrame(props) {
  return (
    <SkeletonTheme color="#202020" highlightColor="#444">
      <Skeleton {...props} />
    </SkeletonTheme>
  );
}

export default SkeletonFrame;
