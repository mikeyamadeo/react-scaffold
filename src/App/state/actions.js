export const CALL_API = Symbol('Call API')

export const REQUEST_SPECS = 'REQUEST_SPECS'

const stackRequested = {
  type: REQUEST_SPECS
}

/**
 * prime data here. :)
 */
export function initApp () {
  return (dispatch) => {
    dispatch(stackRequested)
    return null
  }
}
