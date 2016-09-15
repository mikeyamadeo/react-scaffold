import { configureApiMiddleware } from 'redux-axios-api-middleware'
import { CALL_API } from 'App/state/actions'

let apiRoot = 'https://api.ancestorcloud.com/'

if (!__PROD__) { // eslint-disable-line
  apiRoot = 'https://api-staging.ancestorcloud.com/'
}

export const API_ROOT = apiRoot

export default configureApiMiddleware(CALL_API, API_ROOT)
