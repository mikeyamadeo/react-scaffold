export const CALL_API = Symbol('Call API')

export const callApi = (config) => ({ [CALL_API]: config })
