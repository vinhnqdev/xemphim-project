const DetailsBanner = ({ bannerUrl }) => {
  return (
    <div
      className="movieDetails__banner"
      style={{
        backgroundImage: `url('https://image.tmdb.org/t/p/original/${bannerUrl}')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    ></div>
  );
};
export default DetailsBanner;
