import chai, { expect } from 'chai'
import deepFreeze from 'deep-freeze-strict'
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
      expect(errorState).to.deep.eq(payload.errors)
    })

    context('With errrors already present in the state', () => {
      const initialState = [
        'Whoops',
        'multiple'
      ]

      const expectedState = [
        'Whoops',
        'multiple',
        'errors!'
      ]

      const stateChanges = {
        type: BACKEND_ERROR,
        payload: { errors: ['errors!'] }
      }

      // Deep freeze the state objects to make sure they can't be changed
      deepFreeze(initialState)
      deepFreeze(stateChanges)

      const updatedState = updateErrors(initialState, stateChanges)

      it('does not change the immutable state objects', () => {
        expect(updatedState).to.deep.eq(expectedState)
      })
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
