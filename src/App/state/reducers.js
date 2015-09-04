import { createReducer } from 'utils.redux'
import { REQUEST_SPECS } from './actions'

export const appSpecs = createReducer([
  'react',
  'webpack',
  'babel / es6',
  'CSS Modules',
  'redux'
], {
  [REQUEST_SPECS]: (state, action) => state
})
