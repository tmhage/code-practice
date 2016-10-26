import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import { LoginContainer } from '~/components/Login'

chai.use(chaiEnzyme())


describe('<LoginContainer />', () => {
  const wrapper = shallow(<LoginContainer />);

  it('renders a `form`', () => {
    expect(wrapper.find('form')).to.have.length(1)
  })

  it('should have three input fields', () => {
    expect(wrapper.find('input')).to.have.length(3)
  })
})