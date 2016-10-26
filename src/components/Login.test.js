import React from 'react'
import { shallow, mount } from 'enzyme'
import chai, { expect } from 'chai'
import chaiEnzyme from 'chai-enzyme'

import { LoginContainer } from '~/components/Login'

chai.use(chaiEnzyme())

describe('<LoginContainer />', () => {

  it('renders a `form`', () => {
    const wrapper = shallow(<LoginContainer />);
    expect(wrapper.find('form')).to.have.length(1);
  });

});
