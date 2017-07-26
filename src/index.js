import React from 'react'
import Dom from 'react-dom'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from './state'
import App from './App'

const store = configureStore()
const root = document.getElementById('root')

const Root = () => (
  <Provider {...{ store, key: 'provider' }}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
)

Dom.render(<Root />, root)

if (module.hot) {
  module.hot.accept()
}
