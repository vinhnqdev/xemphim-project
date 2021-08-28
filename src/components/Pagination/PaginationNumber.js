import { Link, useLocation } from "react-router-dom";

function PaginationNumber({
  pageNumber,
  currentPage,
  onScroll,
  getPaginationLink,
}) {
  const location = useLocation();
  return (
    <li className="pagination__number pagination__item" onClick={onScroll}>
      <Link
        to={getPaginationLink(location.pathname, location.search, pageNumber)}
        className={`pagination__link ${currentPage === pageNumber && "active"}`}
      >
        {pageNumber}
      </Link>
    </li>
  );
}

export default PaginationNumber;
