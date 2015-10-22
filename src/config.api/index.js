import { configureApiMiddleware } from 'redux-axios-api-middleware'
import { CALL_API } from 'App/state/actions'

const env = process.env.NODE_ENV || 'development'
const isProd = env === 'production'

export const API_ROOT = isProd
  ? 'http://[PRODUCTION ROOT API URL HERE]'
  : 'http://[STAGING ROOT API URL HERE]'

export default configureApiMiddleware(CALL_API, API_ROOT)
