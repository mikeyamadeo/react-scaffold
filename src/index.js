import React from 'react'
import { render } from 'react-dom'

import { HashRouter } from 'react-router'
import routes from 'config.routes'

import { Provider } from 'react-redux'
import { configureStore } from 'redux.store'

const store = configureStore()

const App = () =>
  <Provider {...{ store, key: 'provider' }}>
    <HashRouter>
      {routes}
    </HashRouter>
  </Provider>

render(<App/>, document.querySelector('#app'))
