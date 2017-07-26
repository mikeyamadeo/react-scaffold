import { createReducer } from 'state/utils'

/**
 * This reducer is here in order to demonstrate inputting and retrieving state w/ redux.
 * Because it is only used in one view and does not change, a hard coded array in the
 * component that uses it normally would be plenty appropriate.
 *
 * When removing this reducer, don't forget to unregister it from redux.reducers
 */
export const appSpecs = createReducer(
  [
    'react \uD83D\uDE18',
    'redux \uD83C\uDF89',
    'webpack',
    'babel / es6',
    'glamor'
  ],
  {}
)
