import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { ADD_ASSIGNMENT } from './assignments'
import * as actions from './assignments'

chai.use(chaiEnzyme())

describe('actions', () => {
  it('should create an action to add an assignment', () => {
    const text = 'Finish tests'
    const expectedAction = {
      type: ADD_ASSIGNMENT,
      text
    }
    expect(actions.addAssignment(text)).to.eql(expectedAction)
  })
})
