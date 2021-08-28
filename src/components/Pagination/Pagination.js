import PaginationNumber from "./PaginationNumber";
import PaginationStep from "./PaginationStep";
const limitRenderingPages = (totalPages, pagesNumberArr, currentPage) => {
  if (!totalPages) {
    // return [...Array(5).keys()].map((x) => ++x);
    return null;
  }
  if (totalPages <= 10) {
    return pagesNumberArr;
  }
  if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
    const limitPagesNumber = pagesNumberArr.filter(
      (pageNumber) =>
        pageNumber === 1 ||
        pageNumber === 2 ||
        pageNumber === 3 ||
        pageNumber === 4 ||
        pageNumber === 5 ||
        pageNumber === totalPages
    );
    limitPagesNumber.splice(5, 0, "...");
    return limitPagesNumber;
  }
  if (currentPage === 4) {
    const limitPagesNumber = pagesNumberArr.filter(
      (pageNumber) =>
        pageNumber === 1 ||
        pageNumber === 2 ||
        pageNumber === 3 ||
        pageNumber === 4 ||
        pageNumber === 5 ||
        pageNumber === 6 ||
        pageNumber === totalPages
    );
    limitPagesNumber.splice(6, 0, "...");
    return limitPagesNumber;
  }
  if (
    currentPage === totalPages ||
    currentPage === totalPages - 1 ||
    currentPage === totalPages - 2
  ) {
    const limitPagesNumber = pagesNumberArr.filter(
      (pageNumber) =>
        pageNumber === totalPages ||
        pageNumber === totalPages - 1 ||
        pageNumber === totalPages - 2 ||
        pageNumber === totalPages - 3 ||
        pageNumber === totalPages - 4 ||
        pageNumber === 1
    );
    limitPagesNumber.splice(1, 0, "...");
    return limitPagesNumber;
  }
  if (currentPage === totalPages - 3) {
    const limitPagesNumber = pagesNumberArr.filter(
      (pageNumber) =>
        pageNumber === totalPages ||
        pageNumber === totalPages - 1 ||
        pageNumber === totalPages - 2 ||
        pageNumber === totalPages - 3 ||
        pageNumber === totalPages - 4 ||
        pageNumber === totalPages - 5 ||
        pageNumber === 1
    );
    limitPagesNumber.splice(1, 0, "...");
    return limitPagesNumber;
  }
  return [
    1,
    "...",
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
    "...",
    totalPages,
  ];
};

const getPaginationLink = (pathName, searchQuery, pageNumber) => {
  if (!searchQuery) {
    return `${pathName}?page=${pageNumber}`;
  } else {
    const indexPageQuery = searchQuery.indexOf("page");
    if (indexPageQuery === -1) {
      return `${pathName}${searchQuery}&page=${pageNumber}`;
    }
    if (indexPageQuery === 1) {
      return `${pathName}?page=${pageNumber}`;
    }
    const extractedPageQuery = searchQuery.slice(0, indexPageQuery - 1);
    return `${pathName}${extractedPageQuery}&page=${pageNumber}`;
  }
};

const Pagination = ({ totalPages, currentPage }) => {
  const pagesNumberArr = [...Array(totalPages).keys()].map((x) => ++x);
  const limitPagesArr = limitRenderingPages(
    totalPages,
    pagesNumberArr,
    currentPage
  );

  const scrollHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  if (!limitPagesArr) {
    return <p>Loading...</p>;
  }
  return (
    <div className="pagination">
      <ul className="pagination__list">
        {limitPagesArr?.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <div key={`dot_${index}`} className="pagination__dot">
                ...
              </div>
            );
          }
          return (
            <PaginationNumber
              key={pageNumber}
              pageNumber={pageNumber}
              currentPage={currentPage}
              onScroll={scrollHandler}
              getPaginationLink={getPaginationLink}
            />
          );
        })}
      </ul>
      <ul className="pagination__list">
        <PaginationStep
          currentPage={currentPage}
          step={-1}
          onScroll={scrollHandler}
          getPaginationLink={getPaginationLink}
        >
          Trang trước
        </PaginationStep>
        <PaginationStep
          currentPage={currentPage}
          step={1}
          onScroll={scrollHandler}
          getPaginationLink={getPaginationLink}
          totalPages={totalPages}
        >
          Trang sau
        </PaginationStep>
      </ul>
    </div>
  );
};

export default Pagination;
