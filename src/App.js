import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// Actions
import { appError, clearErrors } from './actions/errors'

// Components
// import Header from './components/Layout/Header'
// import Footer from './components/Layout/Footer'
import Loader from './components/Layout/Loader'

const clearErrorTimeout = 5000

export class App extends Component {
  constructor() {
    super()

    this.state = {
      errors: null
    }
  }

  renderErrors() {
    const { errors } = this.props
    if (errors === null) return

    if (this.props.errors instanceof String) {
      window.setTimeout( () => this.props.clearErrors(), clearErrorTimeout )
      return this.props.errors
    } else {
      return 'Please check the errors below'
    }
  }

  render() {
    return (
      <div className="app">
        <div>{ this.renderErrors() }</div>

        {/*<Header />*/}

        <main className="content">
          {this.props.children}
        </main>

        {/*<Footer />*/}
        { this.props.loading ? <Loader /> : null }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    loading: state.loading
  }
}

App.propTypes = {
  appError: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { appError, clearErrors })(App)
