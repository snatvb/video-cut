import React from 'react'
import { Switch, Route } from 'react-router'

import Application from './containers/Application'
import Main from './containers/Main'
import Login from './containers/Login'
import LoggedInPage from './containers/LoggedInPage'

export default (
  <Application>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/loggedin" component={LoggedInPage} />
    </Switch>
  </Application>
)
