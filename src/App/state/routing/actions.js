/* ------------------------------------------------------------------------ *\
  These serve as convenience abstractions over the base redux router actions
\* ------------------------------------------------------------------------ */

import { pushState, replaceState } from 'redux-router'

/**
 * @param {String} pathname - e.g. '/search/users'
 * @param {Object} query - e.g. { key0: value, key1: value }
 */
export const transitionTo = (pathname, query = {}) => pushState(null, pathname, query)
export const replaceWith = (pathname, query = {}) => replaceState(null, pathname, query)

/**
 * Depends on redux-thunk to get the current pathname from the state
 */
const makeQueryAction = action => query => (dispatch, getState) => {
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
