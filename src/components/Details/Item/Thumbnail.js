import React from "react";

function Thumbnail({ video, onClick }) {
  return (
    <div className="mySwiper__videos" onClick={onClick}>
      <img
        src={`https://img.youtube.com/vi/${video.key}/0.jpg
                  `}
        alt={video.key}
      />
    </div>
  );
}

export default Thumbnail;
