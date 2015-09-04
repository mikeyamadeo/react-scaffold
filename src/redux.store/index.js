import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from 'config.api'
import * as reducers from 'redux.reducers'

const reducer = combineReducers(reducers)

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  apiMiddleware
)(createStore)

export default function configureStore (initialState) {
  const store = createStoreWithMiddleware(reducer, initialState)

  return store
}
