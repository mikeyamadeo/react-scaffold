import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerStateReducer, reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createHashHistory'
import apiMiddleware from 'config.api'
import * as reducers from 'redux.reducers'
import routes from 'config.routes'

const reducer = combineReducers(Object.assign({}, reducers, { router: routerStateReducer }))

const finalCreateStore = compose(
  reduxReactRouter({ routes, createHistory }),
  applyMiddleware(
    thunkMiddleware,
    apiMiddleware
  )
)(createStore)

export default function configureStore (initialState) {
  const store = finalCreateStore(reducer, initialState)

  return store
}
