// React
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute } from 'react-router'

import { Provider } from 'react-redux'
import { routerActions } from 'react-router-redux'
import { UserAuthWrapper } from 'redux-auth-wrapper'

import store, { history } from './store'

// Styles
import './assets/styles/main.sass'

// User Authentication - redirects to /login by default
const userIsAuthenticated = UserAuthWrapper({
  authSelector: (state) => state.user, // how to get the user state
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
  wrapperDisplayName: 'UserIsAuthenticated', // a nice name for this auth check
  predicate: (user) => user.authentication_token
})

const userIsTeacher = UserAuthWrapper({
  authSelector: (state) => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsTeacher',
  predicate: (user) => user.is_teacher,
  allowRedirectBack: false
})

const userIsAdmin = UserAuthWrapper({
  authSelector: (state) => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAdmin',
  predicate: (user) => user.is_admin,
  allowRedirectBack: false
})

// Routes
import routes from '~/middleware/routes'

// Components
import App from './App'
import Home from './components/Home'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'

import CoursesContainer from './components/Courses/CoursesContainer'
import AssignmentsContainer from './components/Courses/AssignmentsContainer'

import NotFound from './NotFound'

// Note: Plugin needed to use `onTouchTap` prop in components.
// For more detail go to this site:
// https://github.com/zilverline/react-tap-event-plugin
import injectTapEventPlugin from 'react-tap-event-plugin'

// Note: At the moment injectTapEventPlugin can only be called once.
// Put it at the top level of your application, just before you call ReactDOM.render.
// For more detail go to this site:
// https://github.com/zilverline/react-tap-event-plugin/issues/47
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path={routes.loginPath} component={Login} />
        <Route path={routes.resetPasswordPath} component={ResetPassword} />
        <Route path={routes.coursesPath} component={userIsAuthenticated(CoursesContainer)} />
        <Route path={`${routes.coursesPath}/:courseId`} component={userIsAuthenticated(AssignmentsContainer)} />
      </Route>
      <Route path="*" component={NotFound}/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
