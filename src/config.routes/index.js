import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'App'
import Stack from 'App/views/Stack'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Stack} />
  </Route>
)

export default routes
