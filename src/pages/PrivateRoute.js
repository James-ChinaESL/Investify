import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Spinner from "../components/Spinner";

const PrivateRoute = ({ children, ...rest }) => {
  let { isLoading, isAuthenticated } = useAuth0();

  if (isLoading === true) return <Spinner />;
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to='/'></Redirect>;
      }}
    ></Route>
  );
};
export default PrivateRoute;
