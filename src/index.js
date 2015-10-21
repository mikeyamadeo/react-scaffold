import React from 'react'
import ReactDOM from 'react-dom'
import { configureStore } from 'redux.store'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

const store = configureStore()
const dest = document.getElementById('app')

const Root = props =>
  <Provider store={store} key='provider'>
    <ReduxRouter />
  </Provider>

ReactDOM.render(<Root />, dest)

if (__DEV__) { // eslint-disable-line
  const DevTools = require('./DevTools')

  ReactDOM.render(
    <Provider store={store} key='provider'>
      <div>
        <ReduxRouter />
        <DevTools store={store}/>
      </div>
    </Provider>,
    dest
  )
}
