import React from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router";

function PrivateRoute({ component: Component }, ...rest) {
  const user = useSelector((state) => state.user.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        return Object.keys(user).length > 0 ? (
          <Component {...props} />
        ) : (
          <p>You must login before performing this action</p>
        );
      }}
    ></Route>

    // <Route {...rest}>
    //   {Object.keys(user).length > 0 ? children : <Redirect to="/login" />}
    // </Route>
  );
}

export default PrivateRoute;
