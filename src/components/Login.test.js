import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())

import { LoginContainer } from './Login'


describe('<LoginContainer />', () => {
  const wrapper = shallow(<LoginContainer />);

  it('renders a form', () => {
    expect(wrapper.find('form')).to.have.length(1)
  })

  it('renders a form that contains a descendant with id password', () => {
    expect(wrapper).to.have.tagName('form')
    expect(wrapper).to.have.descendants('#password')
  })

  it('has three input fields', () => {
    expect(wrapper.find('input')).to.have.length(3)
  })

  it('renders children when passed in', () => {
    const wrapper = shallow(
      <form>
        <input id="email" />
      </form>
    )
    expect(wrapper.contains(<input id="email" />)).to.equal(true);
  })

  
})
