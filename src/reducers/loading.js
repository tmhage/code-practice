import { APP_LOADING, APP_LOADED } from '~/actions/api'

export default function loading(state = false, { type, payload }) {
  switch (type) {
    case APP_LOADING :
      return true
    case APP_LOADED :
      return false
    default :
      return state
  }
}
