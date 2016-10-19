import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import NotFound from './NotFound'

chai.use(chaiEnzyme())

const element = shallow(<NotFound />)

describe('<NotFound />', () => {
  it('contains a h1 tag', () => {
    expect(element).to.have.tagName('h1')
  })

  it('says Page Not Found', () => {
    expect(element).to.have.text('Page Not Found')
  })
})
