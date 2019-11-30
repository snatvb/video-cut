import React from 'react';
import { Switch, Route } from 'react-router';

import Login from './containers/Login';
import LoggedInPage from './containers/LoggedInPage';

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route exact path="/loggedin" component={LoggedInPage} />
  </Switch>
);
