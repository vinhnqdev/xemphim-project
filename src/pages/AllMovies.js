import Filter from "../components/UI/Filter/Filter";
import ListMovie from "../components/UI/ListMovie";

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