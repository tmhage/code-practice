import { BACKEND_ERROR, CLEAR_ERRORS } from '~/actions/errors'

export default function updateErrors(state = null, { type, payload } = {}) {
  if(type === BACKEND_ERROR) {
    return payload.error || payload.errors
  }

  else if(type === CLEAR_ERRORS) {
    return null
  }

  return state
}
