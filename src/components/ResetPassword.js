import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import Api from '~/middleware/api'
import routes from '~/middleware/routes'
import { Link } from 'react-router'

import { resetPassword } from '~/actions/user'
import { clearErrors } from '~/actions/errors'

function select(state, ownProps) {
  const passwordIsReset = state.user.passwordIsReset || false
  const formErrors = state.errors || {}
  return {
    passwordIsReset,
    formErrors
  }
}

class ResetPasswordContainer extends Component {
  componentWillMount() {
    const { passwordIsReset, replace } = this.props
    console.log(this.props)
    if (passwordIsReset) {
      replace('/')
    }
  }

  componentWillReceiveProps(nextProps) {
    const { passwordIsReset, replace } = nextProps

    if (passwordIsReset) {
      replace('/')
    }
  }

  onSubmit(e) {
    e.preventDefault()
    this.props.clearErrors()
    this.props.resetPassword(this.refs.email.value)
  }

  renderFormErrors(field) {
    const { formErrors } = this.props
    if (formErrors === undefined) return
    if (formErrors[field] === undefined) return

    return formErrors[field].map((error, i) => {
      return (<span key={`error-${field}-${i}`}>{field} {error}</span>)
    })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <h2>Forgot your password?</h2>
        <p>
          Please submit your email address and we will try to find your account
          and send you a link to reset your password.
        </p>
        <label htmlFor="email">Email:</label>
        <input id="email" type="email" ref="email" />
        { this.renderFormErrors('email') }
        <br/>
        <Link to={routes.loginPath}>Sign in</Link>
        <input type="Submit" defaultValue="Reset password" />
      </form>
    )
  }
}

ResetPasswordContainer.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  replace: PropTypes.func.isRequired
}

export default connect(select, { resetPassword, clearErrors, replace: routerActions.replace })(ResetPasswordContainer)
