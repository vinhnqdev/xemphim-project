import { createContext, useContext, useState } from "react";

const DetailsContext = createContext();

export const useDetails = () => {
  return useContext(DetailsContext);
};

export const DetailsProvider = (props) => {
  const [trailers, setTrailers] = useState(null);
  const [details, setDetails] = useState(null);
  const updateTrailers = (data) => {
    setTrailers(data);
  };
  const updateDetails = (data) => {
    setDetails(data);
  };

  const value = {
    trailers,
    details,
    updateTrailers,
    updateDetails,
  };

  return (
    <DetailsContext.Provider value={value}>
      {props.children}
    </DetailsContext.Provider>
  );
};

export default DetailsContext;
