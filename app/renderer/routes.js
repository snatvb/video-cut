import React from 'react'
import { Switch, Route } from 'react-router'

import Application from './containers/Application'
import Main from './containers/Main'

export default (
  <Application>
    <Switch>
      <Route exact path="/" component={Main} />
    </Switch>
  </Application>
)
