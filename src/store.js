// Redux
import { browserHistory } from 'react-router'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
import ReduxThunk from 'redux-thunk'

// Initial Store and History Setup
import { routerReducer, routerMiddleware } from 'react-router-redux'
import * as reducers from './reducers'

// Assignment reducer and action
import assignments from './reducers/assignments'
import { addAssignment } from './actions/assignments'

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

// Assignment store
const store = createStore(assignments, enhancer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(reducer, enhancer)

// Subscribe to changes in assignment store state and log them
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

// Dispatch actions to change state
store.dispatch(addAssignment('Learn about actions'))
store.dispatch(addAssignment('Learn about reducers'))
store.dispatch(addAssignment('Learn about store'))

unsubscribe()

export const history = syncHistoryWithStore(baseHistory, store)

export default store
