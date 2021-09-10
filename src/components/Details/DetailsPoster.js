import { useHistory } from "react-router";

const DetailsPoster = ({ posterUrl, movieId }) => {
  const history = useHistory();

  const clickBtnWatchHanlder = () => {
    history.push(`/watch/${movieId}`);
  };

  console.log(movieId);
  return (
    <div className="movieDetails__poster">
      <img src={`https://image.tmdb.org/t/p/w342${posterUrl}`} alt="title" />
      <button className="movieDetails__action" onClick={clickBtnWatchHanlder}>
        <i className="fas fa-caret-right"></i>Xem phim
      </button>
    </div>
  );
};

export default DetailsPoster;
