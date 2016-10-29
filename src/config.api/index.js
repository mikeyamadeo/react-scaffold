import { configureApiMiddleware } from 'redux-axios-api-middleware'
import { CALL_API } from 'App/state/actions'

let apiRoot = 'YOUR_DEV_API'

if (!__PROD__) { // eslint-disable-line
  apiRoot = 'YOUR_PROD_API'
}

export const API_ROOT = apiRoot

export default configureApiMiddleware(CALL_API, API_ROOT)
