import { appLoading, appDoneLoading } from './api'
import api from '../middleware/api'

export const USER_LOADING = 'USER_LOADING'
export const USER_LOGGED_IN = 'USER_LOGGED_IN'
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT'
export const USER_LOGIN_FAILED = 'BACKEND_ERROR'
export const USER_RESET_PASSWD = 'USER_RESET_PASSWD'
export const USER_RESET_PASSWD_FAILED = 'BACKEND_ERROR'

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(appLoading())

    api.login(email, password)
      .then((data) => {
        dispatch(appDoneLoading())

        if (data.error) {
          dispatch(loginFailed(data))
        } else {
          dispatch(loginSuccessful(data))
        }
      })
  }
}

const loginSuccessful = (data) => {
  return {
    type: USER_LOGGED_IN,
    payload: data
  }
}

const loginFailed = (data) => {
  return {
    type: USER_LOGIN_FAILED,
    payload: data
  }
}

export const resetPassword = (email) => {
  return (dispatch) => {
    dispatch(appLoading())

    api.resetPassword(email)
      .then((data) => {
        dispatch(appDoneLoading())

        if (data.errors) {
          dispatch(resetPasswordFailed(data))
        } else {
          dispatch(resetPasswordSuccessful(data))
        }
      })
  }
}

export const resetPasswordSuccessful = (data) => {
  const merged = Object.assign({}, data, { passwordIsReset: true })
  return {
    type: USER_RESET_PASSWD,
    payload: { passwordIsReset: true }
  }
}

export const resetPasswordFailed = (data) => {
  const merged = Object.assign({}, data, { passwordIsReset: false })
  return {
    type: USER_RESET_PASSWD_FAILED,
    payload: merged
  }
}

export const logout = () => {
  return {
    type: USER_LOGGED_OUT
  }
}
