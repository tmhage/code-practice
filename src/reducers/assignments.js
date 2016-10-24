import { ADD_ASSIGNMENT } from '../actions/assignments'
import { createStore } from 'redux'

function assignments(state = [], action) {
  switch (action.type) {
    case 'ADD_ASSIGNMENT':
      return state.concat([ action.text ])
    default:
      return state
  }
}
