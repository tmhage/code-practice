import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import Loader from './Loader'

chai.use(chaiEnzyme())

const element = shallow(<Loader />)

describe('<Loader />', () => {
  it('has a loader class name', () => {
    expect(element).to.have.tagName('div')
    expect(element).to.have.className('loader')
  })
})
