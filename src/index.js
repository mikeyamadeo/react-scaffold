import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from 'redux.store'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import routes from 'config.routes'

const store = configureStore()
const dest = document.getElementById('app')

const Root = props =>
  <Provider store={store} key='provider'>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>

ReactDOM.render(<Root />, dest)
