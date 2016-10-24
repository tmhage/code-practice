export const ADD_TODO = 'ADD_TODO'

export function addAssignment(text) {
  return {
    assignments: [
      {
        type: ADD_TODO,
        text: 'React'
      },
      {
        type: ADD_TODO,
        text: 'Ruby on Rails'
      },
      {
        type: ADD_TODO,
        text: 'JavaScript'
      },
      {
        type: ADD_TODO,
        text: 'jQuery'
      }
    ]
  }
}
