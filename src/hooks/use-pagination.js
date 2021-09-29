import { useLocation } from "react-router-dom";
import { useCallback, useState } from "react";

const parseParams = (querystring) => {
  // parse query string
  const params = new URLSearchParams(querystring);
  const obj = {};
  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }
  return obj;
};
const usePagination = (checkError = true) => {
  const [totalPages, setTotalPages] = useState(null);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const queryObj = parseParams(location.search);
  let hasError = false;
  let { page } = queryObj;
  if (page === undefined) {
    page = 1;
  }
  if (checkError) {
    if (
      isNaN(+page) ||
      isError ||
      (!queryObj.hasOwnProperty("page") && Object.keys(queryObj).length > 0)
    ) {
      hasError = true;
    }
  } else {
    if (isNaN(+page) || isError) {
      hasError = true;
    }
  }

  const totalPagesHandler = useCallback((totalPages) => {
    setTotalPages(totalPages);
  }, []);

  const errorHandler = useCallback(() => {
    setIsError(true);
  }, []);

  return {
    page,
    totalPages,
    hasError,
    totalPagesHandler,
    errorHandler,
  };
};
export default usePagination;
