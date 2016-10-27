import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'
import spies from 'chai-spies'
chai.use(spies)
chai.use(chaiEnzyme())

import { LoginContainer } from './Login'


describe('<LoginContainer />', () => {
  const wrapper = shallow(<LoginContainer />)

  it('renders a form', () => {
    expect(wrapper.find('form')).to.have.length(1)
  })

  it('renders a form that contains certain elements', () => {
    const emailLabel = wrapper.childAt(1)

    expect(wrapper).to.have.tagName('form')
    expect(wrapper).to.have.descendants('#password')
    expect(emailLabel.text()).to.equal('Email:')
  })

  it('has three input fields', () => {
    expect(wrapper.find('input')).to.have.length(3)
  })

  it('renders children when passed in', () => {
    const wrapper = mount(<LoginContainer />)
    expect(wrapper.ref('email')).to.have.tagName('input')
    expect(wrapper.ref('email').prop('id')).to.equal('email')
    expect(wrapper.ref('email').prop('type')).to.equal('email')
  })

  it('should have props for login and replace', () => {
    expect(wrapper.props().login).to.be.defined
    expect(wrapper.props().replace).to.be.defined
  })

  describe('form submission', () => {
    const loginSpy = chai.spy()
    const wrapper = mount(<LoginContainer login={loginSpy} />)

    it('should call login() upon submitting the form with values', () => {
      wrapper.ref('email').get(0).value = 'David'
      wrapper.ref('password').get(0).value = 'verysecret'
      wrapper.simulate('submit')
      expect(wrapper.props().login).to.have.been.called
        .with.exactly('David', 'verysecret')
    })

    it('should not call login() upon submitting the form without values', () => {
      loginSpy.reset()
      wrapper.ref('email').get(0).value = ''
      wrapper.ref('password').get(0).value = ''
      wrapper.simulate('submit')
      expect(wrapper.props().login).not.to.have.been.called()
    })
  })
})
