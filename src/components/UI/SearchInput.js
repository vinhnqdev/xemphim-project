import { useHistory, useLocation } from "react-router-dom";
import { useRef } from "react";
const SearchInput = ({ onSearchText }) => {
  const typingTimeOut = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  let searchText = queryParams.get("search");
  if (typingTimeOut.current) {
    clearTimeout(typingTimeOut.current);
  }
  typingTimeOut.current = setTimeout(() => {
    onSearchText(searchText);
  }, 300);
  const searchChangeHandler = (e) => {
    history.push(`/search?search=${e.target.value}`);
  };
  return (
    <input
      onChange={searchChangeHandler}
      className="search__input"
      placeholder="Enter your favorite movie..."
    />
  );
};
export default SearchInput;
