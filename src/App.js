import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

// Actions
import { appError, clearErrors } from './actions/errors'
import { logout } from '~/actions/user'

// Material UI Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from './assets/styles/theme'

// Components
import Header from './components/Layout/Header'
// import Footer from './components/Layout/Footer'
import Loader from './components/Layout/Loader'
import RaisedButton from 'material-ui/RaisedButton'

const clearErrorTimeout = 5000

export class App extends Component {
  constructor() {
    super()
  }

  getChildContext() {
    return { muiTheme }
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
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="app">
          <div>{ this.renderErrors() }</div>

          <Header />

          <main className="content">
            {this.props.children}
          </main>

          {/*<Footer />*/}
          { this.props.loading ? <Loader /> : null }
        </div>
      </MuiThemeProvider>
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
  loading: PropTypes.bool.isRequired,
  errors: PropTypes.array,
}

App.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired,
}

export default connect(mapStateToProps, { appError, clearErrors })(App)
