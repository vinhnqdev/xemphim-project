const DetailsPoster = ({ posterUrl }) => {
  return (
    <div className="movieDetails__poster">
      <img src={`https://image.tmdb.org/t/p/w342${posterUrl}`} alt="title" />
      <button className="movieDetails__action">
        <i className="fas fa-caret-right"></i>Xem phim
      </button>
    </div>
  );
};

export default DetailsPoster;
