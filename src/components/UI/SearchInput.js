import { useHistory, useLocation } from "react-router-dom";
import { useRef } from "react";
import { parseParams } from "../../assets/helperFunction/u-function";
const SearchInput = ({ onSearchText }) => {
  const typingTimeOut = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const { search: searchText } = parseParams(location.search);

  if (typingTimeOut.current) {
    clearTimeout(typingTimeOut.current);
  }
  typingTimeOut.current = setTimeout(() => {
    onSearchText(searchText);
  }, 300);
  const searchChangeHandler = (e) => {
    history.push({
      pathname: `/search`,
      search: `?search=${e.target.value}`,
    });
  };
  return (
    <input
      onChange={searchChangeHandler}
      className="search__input"
      placeholder="Tìm kiếm phim bạn thích..."
    />
  );
};
export default SearchInput;
