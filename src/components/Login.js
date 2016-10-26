import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import Api from '~/middleware/api'
import { Link } from 'react-router'

import { login } from '~/actions/user'

function select(state, ownProps) {
  const isAuthenticated = state.user.authentication_token || false
  const redirect = ownProps.location.query.redirect || '/'
  return {
    isAuthenticated,
    redirect
  }
}

export class LoginContainer extends Component {
  componentWillMount() {
    const { isAuthenticated, replace, redirect } = this.props
    if (isAuthenticated) {
      replace(redirect)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, replace, redirect } = nextProps
    const { isAuthenticated: wasAuthenticated } = this.props

    if (!wasAuthenticated && isAuthenticated) {
      replace(redirect)
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.login(this.refs.email.value, this.refs.password.value)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h2>Please sign in</h2>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" ref="email" />
        <br/>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" ref="password" />
        <br/>
        <Link to="/reset-password">I forgot my password</Link>
        <input type="Submit" defaultValue="Sign in" />
      </form>
    )
  }
}

LoginContainer.propTypes = {
  login: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired
}

export default connect(select, { login, replace: routerActions.replace })(LoginContainer)
