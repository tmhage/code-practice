export const BACKEND_ERROR = 'BACKEND_ERROR'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export function appError(data) {
  return {
    type: BACKEND_ERROR,
    payload: data
  }
}

export function clearErrors() {
  return {
    type: CLEAR_ERRORS
  }
}
