import ListMovie from "../components/ListMovie/ListMovie";
import SearchInput from "../components/UI/SearchInput";
import { useState } from "react";
import movieApi from "../api/movieApi";
import { API_KEY } from "../api/Api-key";
const Search = () => {
  const [querySearch, setQuerySearch] = useState("");
  const searchTextHandler = (searchText) => {
    if (!searchText) return;
    setQuerySearch(searchText);
  };
  return (
    <section className="search">
      <div className="container">
        <div className="search__block">
          <SearchInput onSearchText={searchTextHandler} />
          {querySearch && (
            <ListMovie
              api={movieApi.getMovieWithSearch}
              params={{
                api_key: API_KEY,
                language: "vi",
                include_adult: false,
                page: 1,
                query: querySearch,
              }}
              desiredAmount={20}
            />
          )}
        </div>
      </div>
    </section>
  );
};
export default Search;
