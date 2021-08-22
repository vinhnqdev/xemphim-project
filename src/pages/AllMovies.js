import Filter from "../components/Filter/Filter";
import ListMovie from "../components/ListMovie/ListMovie";

const AllMovie = () => {
  return (
    <section className="allmovie">
      <div className="container">
        <Filter />
        <ListMovie hasTitle={false} />
      </div>
    </section>
  );
};
export default AllMovie;
