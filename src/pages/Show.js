import ListMovie from "../components/ListMovie/ListMovie";
import TitleMovie from "../components/UI/TitleMovie";
import requests from "../api/Requests";
const Show = () => {
  return (
    <section className="show">
      <div className="container">
        <TitleMovie title="TV" />
        <ListMovie
          type="tv"
          fetchUrl={requests.tvPopularRequest}
          desiredAmount={20}
        />
      </div>
    </section>
  );
};
export default Show;
