import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from 'redux.store'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from 'config.routes'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)
const dest = document.getElementById('app')

const Root = props =>
  <Provider store={store} key='provider'>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>

ReactDOM.render(<Root />, dest)
