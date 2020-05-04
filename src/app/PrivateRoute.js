import React from "react";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};
