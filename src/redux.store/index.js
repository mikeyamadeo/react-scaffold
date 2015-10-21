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

export function configureStore (initialState) {

  if (__DEV__) { // eslint-disable-line
    const devTools = require('redux-devtools').devTools
    console.log(devTools)
    store = compose(
      coreMiddleware,
      devTools()
    )(createStore)(reducer, initialState)
    return store
  }

  store = coreMiddleware(createStore)(reducer, initialState)

  return store
}

export function getStore () {
  return store
}
