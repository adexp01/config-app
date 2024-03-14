/**
 * Crm Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Config from "./config";

const EmployeesRoute = ({ match }) => {
  return (
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />

      <Route path={`${match.url}/config`} component={Config} />
    </Switch>
  );
};

export default EmployeesRoute;
