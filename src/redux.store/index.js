import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerStateReducer, reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createHashHistory'
import apiMiddleware from 'config.api'
import * as reducers from 'redux.reducers'
import routes from 'config.routes'

let store = {}

const reducer = combineReducers({
  ...reducers,
  router: routerStateReducer
})

const coreMiddleware = compose(
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware
  )
)

/**
 * 1. this code block only runs in development mode. It is completely removed when bundled
 * for staging or production.
 * 2. adds dev tools if the chrome extension is installed:
 * https://github.com/zalmoxisus/redux-devtools-extension
 */
export function configureStore (initialState) {

  if (__DEV__) { /* [1] */ // eslint-disable-line
    const { devToolsExtension } = window
    store = createStore(
      reducer,
      initialState,
      compose(
        coreMiddleware,
        devToolsExtension ? devToolsExtension() : f => f /* [2] */
      )
    )
    return store
  }

  store = createStore(reducer, initialState, coreMiddleware)

  return store
}

export const getStore = () => store

