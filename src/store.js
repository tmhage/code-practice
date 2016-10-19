// Redux
import { browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'

// Initial Store and History Setup
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as reducers from './reducers'

const baseHistory = browserHistory
const routingMiddleware = routerMiddleware(baseHistory)
const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routerReducer
}))

const devTools = window.devToolsExtension ? window.devToolsExtension() : (f) => f

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(routingMiddleware),
  applyMiddleware(ReduxThunk),
  devTools
)

const store = createStore(reducer, enhancer)

export const history = syncHistoryWithStore(baseHistory, store)

export default store
