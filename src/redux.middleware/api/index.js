import axios from 'axios'
import { Promise } from 'axios/node_modules/es6-promise'

const DEFAULT_METHOD = `GET`

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 */
export function configureApiMiddleware (CALL_API, API_ROOT) {

  return store => next => action => {
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
      return next(action)
    }

    _checkCallApi(callAPI)
    const config = composeConfig(Object.assign({}, callAPI, {apiRoot: API_ROOT}))

    const { schema, types, meta, bailout } = callAPI

    if (bailout && bailout(store.getState())) {
      return Promise.resolve()
    }

    function actionWith (data) {
      const finalAction = Object.assign({}, action, data)
      delete finalAction[CALL_API]
      return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({ type: requestType, meta }))

    return callApi(config, schema).then(payload => next(actionWith({
        payload,
        meta,
        type: successType
      })),
      error => {
        return next(actionWith({type: failureType, error: error.message || 'Something bad happened'}))
      }
    )
  }
}

function _checkCallApi (callAPI) {
  const { types, bailout } = callAPI

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  if (typeof bailout !== 'undefined' && typeof bailout !== 'function') {
    throw new Error('Expected bailout to either be undefined or a function.')
  }
}

/**
 * Fetches an API response and normalizes the result JSON according to schema.
 * This makes every API response have the same shape, regardless of how nested it was.
 */
function callApi (config, schema) {
  return axios(config)
    .then(response => applySchema(schema, JSON.parse(response.data)))
    .catch(err => {
      console.warn(err)
      throw new Error(err)
    })
}

/**
 * INPUT ->
 * Schema: {
 *  id: '_id',
 *  name: 'users'
 * }
 * +
 * Data: {
 *  _id: 1
 *  firstName: 'tina'
 * }
 *
 * OUTPUT ->
 * Result: {
 *  entities: {
 *    '1': { _id: 1, firstName: 'tina'}
 *  }
 *  result: [1]
 * }
 */
function applySchema (schema, data) {
  if (!schema) return data

  const entities = {
    [schema.name]: {}
  }

  let result = []

  // assumes it's a single object of type entity
  if (data.constructor !== Array) {
    data = [data]
  }

  data.forEach((item, i) => {
    let id = data[i][schema.id]
    entities[schema.name][id] = data[i]
    result.push(id)
  })

  return { entities, result }
}

function composeConfig (callAPI) {
  let {
    apiRoot, url, endpoint, method, headers,
    transformResponse, params, data
  } = callAPI

  if (!url) {

    if (!endpoint || typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.')
    }

    url = apiRoot + endpoint
  }

  if (!method) {
    method = DEFAULT_METHOD
  }

  return {
    url, method, headers,
    transformResponse, params, data
  }
}

