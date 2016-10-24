export const ADD_ASSIGNMENT = 'ADD_ASSIGNMENT'

export function addAssignment(text) {
  return {
    type: ADD_ASSIGNMENT,
    text
  }
}
