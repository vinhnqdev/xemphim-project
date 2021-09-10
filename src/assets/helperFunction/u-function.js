export const parseParams = (querystring) => {
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

export const convertToYearString = (string) => {
  if (string) {
    const humanReadableDate = new Date(string).toLocaleDateString("en-US", {
      year: "numeric",
    });
    return humanReadableDate;
  }
};

export const createPath = (mediaType, type) => {
  if (type) {
    return "/" + type;
  }
  if (mediaType === "tv") {
    return "/tv";
  }
  if (mediaType === "movie") {
    return "/movie";
  }
};

export const truncate = (str, number) => {
  return str?.length < number ? str : str?.substr(0, number - 1) + "...";
};
