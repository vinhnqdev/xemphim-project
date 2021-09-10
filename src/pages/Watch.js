import React from "react";
import { useParams } from "react-router";

function Watch() {
  const { movieId } = useParams();
  return <div>Phim mã số {movieId} đang được cập nhật 😝</div>;
}

export default Watch;
