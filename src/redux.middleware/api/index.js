import axios from 'axios'
import { Promise } from 'axios/node_modules/es6-promise'
import { composeConfig, applySchema } from './utils'

let _interceptorsAreSet = false

function useInterceptors (state, {requests = [], responses = []}) {

  requests.forEach((fn) => {
    axios.interceptors.request.use(fn.bind(null, state))
  })

  responses.forEach((fn) => {
    axios.interceptors.response.use(fn.bind(null, state))
  })

  _interceptorsAreSet = true
}

/**
 * A Redux middleware that interprets actions with CALL_API info specified.
 * Performs the call and promises when such actions are dispatched.
 */
export function configureApiMiddleware (CALL_API, API_ROOT, interceptors) {

  return store => next => action => {

    if (!_interceptorsAreSet) useInterceptors(store.getState(), interceptors)

    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
      return next(action)
    }

    _checkCallApi(callAPI)
    const config = composeConfig(Object.assign({}, callAPI, {apiRoot: API_ROOT}))

    const { schema, types, payload, meta, bailout } = callAPI

    if (bailout && bailout(store.getState())) {
      return Promise.resolve()
    }

    function actionWith (data) {
      const finalAction = Object.assign({}, action, data)
      delete finalAction[CALL_API]
      return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({ type: requestType, payload, meta }))

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

