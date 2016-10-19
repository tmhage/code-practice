import * as auth from '~/actions/user'

const API_URL = 'http://api.codaisseur.dev'

class Api {
  // Create a set of extensible default headers
  defaultHeaders(otherHeaders = {}) {
    // Get the Auth params from the user object in localStorage
    let { email, authentication_token } =
      JSON.parse(localStorage.getItem('user')) || {}

    // Create the Auth headers
    // See: https://github.com/gonzalo-bulnes/simple_token_authentication
    let authHeaders = {}
    if (authentication_token && email) {
      authHeaders = {
        'X-User-Token': authentication_token,
        'X-User-Email': email
      }
    }

    let acceptHeaders = Object.assign({}, authHeaders, {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })

    return Object.assign({}, acceptHeaders, otherHeaders)
  }


  login(email, password) {
    let self = this
    let url = this.url('/users/sign_in')
    let loginData = {
      user: { email, password }
    }

    return fetch(url, {
      method: 'POST',
      headers: this.defaultHeaders(),
      body: JSON.stringify(loginData)
    }).then((response) => response.json())
  }

  resetPassword(email) {
    let url = this.url('/users/password')
    let resetData = {
      user: { email }
    }

    return fetch(url, {
      method: 'POST',
      headers: this.defaultHeaders(),
      body: JSON.stringify(resetData)
    }).then((response) => response.json())
  }

  get(path) {
    let url = this.url(path)

    return fetch(url, {
      method: 'GET',
      headers: this.defaultHeaders(),
    }).then((response) => response.json())
  }

  url(path = '/') {
    return `${API_URL}${path}.json`
  }
}

const api = new Api()

export default api
