import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

let store = {}

const reducer = require('App/state').default

const coreMiddleware = applyMiddleware(thunk)

/**
 * 1. this code block only runs in development mode. It is completely removed when bundled
 * for staging or production.
 * 2. adds dev tools if the chrome extension is installed:
 * https://github.com/zalmoxisus/redux-devtools-extension
 */
export function configureStore (initialState) {
  if (__DEV__) {
    /* [1] */
    // eslint-disable-line
    const { devToolsExtension } = window || {}
    store = createStore(
      reducer,
      initialState,
      compose(
        coreMiddleware,
        devToolsExtension ? devToolsExtension() : _ => _ /* [2] */
      )
    )
    return store
  }

  store = createStore(reducer, initialState, coreMiddleware)

  return store
}

export const getStore = () => store
