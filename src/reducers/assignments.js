import { combineReducers } from 'redux'
import { ADD_ASSIGNMENT } from '../actions/assignments'

function assignments(state = [], action) {
  switch (action.type) {
    case ADD_ASSIGNMENT:
      return [
        ...state,
        {
          text: action.text
        }
      ]
    default:
      return state
  }
}

export default assignments
