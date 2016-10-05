import React from 'react'

import { MatchWithSubRoutes } from 'utils.routing'

import App from 'App'
import Stack from 'App/views/Stack'

const routesData = [
  {pattern: '/', component: App, routes: [
    {pattern: '/', component: Stack}
  ]}
]

const routes =
  <div>
    {routesData.map((route, i) =>
      <MatchWithSubRoutes {...{ ...route, key: i }} />
    )}
  </div>

export default routes
