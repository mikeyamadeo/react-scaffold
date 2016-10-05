import './style/css'
import React, { PropTypes } from 'react'

import { MatchWithSubRoutes } from 'utils.routing'

const App = ({routes}) => (
  <div>
    {routes.map((route, i) => <MatchWithSubRoutes {...{ ...route, key: i }} />)}
  </div>
)

App.propTypes = {
  children: PropTypes.node
}

export default App
