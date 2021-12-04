import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./SkeletonFrame.css";
function SkeletonFrame(props) {
  return (
    <SkeletonTheme height="100%" color="#202020" highlightColor="#444">
      <Skeleton {...props} />
    </SkeletonTheme>
  );
}

export default SkeletonFrame;
