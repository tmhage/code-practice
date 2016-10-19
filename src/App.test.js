import React from 'react'
import { shallow } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import { App } from './App'

chai.use(chaiEnzyme())

const element = shallow(<App />)

describe('<App />', () => {
  it('has a wrapping div tag', () => {
    expect(element).to.have.tagName('div')
  })

  it('has a main section', () => {
    expect(element).to.have.descendants('main.content')
  })
})
