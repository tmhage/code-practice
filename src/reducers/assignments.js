import { combineReducers } from 'redux'
import { ADD_ASSIGNMENT } from '../actions/assignments'

const initialState = [
  {
    text: 'Ruby on Rails'
  }
]

export default function assignments(state = initialState, action) {
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
