export const APP_LOADING = 'APP_LOADING'
export const APP_LOADED = 'APP_LOADED'

export const appLoading = () => {
  return {
    type: APP_LOADING
  }
}

export const appDoneLoading = () => {
  return {
    type: APP_LOADED
  }
}
