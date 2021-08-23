import ListMovie from "../components/ListMovie/ListMovie";
import SearchInput from "../components/UI/SearchInput";
import { useState } from "react";
import requests from "../api/Requests";
const Search = () => {
  const [fetchUrl, setFetchUrl] = useState(null);

  const searchTextHandler = (searchText) => {
    if (!searchText) return;
    const encodedSearchText = encodeURIComponent(searchText);
    setFetchUrl(`${requests.searchMultiRequest}&query=${encodedSearchText}`);
  };
  return (
    <section className="search">
      <div className="container">
        <div className="search__block">
          <SearchInput onSearchText={searchTextHandler} />
          <ListMovie fetchUrl={fetchUrl} desiredAmount={20} />
        </div>
      </div>
    </section>
  );
};
export default Search;
