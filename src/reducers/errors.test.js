import chai, { expect } from 'chai'
import updateErrors from './errors'
import { BACKEND_ERROR, CLEAR_ERRORS } from '~/actions/errors'

describe('updateErrors', () => {
  const initialState = updateErrors()

  it('has an initial state of null', () => {
    expect(initialState).to.eq(null)
  })

  describe(BACKEND_ERROR, () => {
    const type = BACKEND_ERROR
    const payload = {
      errors: [
        'Whoops',
        'multiple',
        'errors!'
      ]
    }

    const errorState = updateErrors(null, { type, payload})

    it('takes the error state from the payload', () => {
      expect(errorState).to.eq(payload.errors)
    })
  })

  describe(CLEAR_ERRORS, () => {
    const type = CLEAR_ERRORS

    const clearedState = updateErrors(null, { type })

    it('takes the error state from the payload', () => {
      expect(clearedState).to.eq(null)
    })
  })
})
