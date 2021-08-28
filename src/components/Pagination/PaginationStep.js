import { Link, useLocation } from "react-router-dom";

function PaginationStep(props) {
  const { currentPage, step, onScroll, getPaginationLink, totalPages } = props;
  const location = useLocation();
  return (
    <li className="pagination__number pagination__item" onClick={onScroll}>
      <Link
        to={getPaginationLink(
          location.pathname,
          location.search,
          currentPage + step
        )}
        className={`pagination__link ${step === 1 && "u-mr-0"} ${
          currentPage === 1 && step === -1 && "hidden"
        } ${currentPage === totalPages && step === 1 && "hidden"}`}
      >
        {props.children}
      </Link>
    </li>
  );
}

export default PaginationStep;
