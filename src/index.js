import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from 'redux.store'
import { Provider } from 'react-redux'
import { ReduxRouter } from 'redux-router'

const store = configureStore()

const Root = props => (
    <div>
      <Provider store={store}>
        <ReduxRouter />
      </Provider>
    </div>
  )

ReactDOM.render(<Root />, document.getElementById('app'))
