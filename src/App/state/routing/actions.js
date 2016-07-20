/* ------------------------------------------------------------------------ *\
  These serve as convenience abstractions over the base redux router actions
\* ------------------------------------------------------------------------ */

import { push, replace } from 'react-router-redux'

/**
 * @param {String} pathname - e.g. '/search/users'
 * @param {Object} query - e.g. { key0: value, key1: value }
 */
export const transitionTo = (pathname, query = {}) => push(null, pathname, query)
export const replaceWith = (pathname, query = {}) => replace(null, pathname, query)

/**
 * Depends on redux-thunk to get the current pathname from the state
 */
const makeQueryAction = (action) => (query) => (dispatch, getState) => {
  const { location } = getState().router

  return dispatch(action(location.pathname, {
    ...location.query,
    ...query
  }))
}

/**
 * @param {Object} query
 */
export const updateQuery = makeQueryAction(transitionTo)
export const replaceQuery = makeQueryAction(replaceWith)
