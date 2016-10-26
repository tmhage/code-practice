import React from 'react'
import chai, { expect } from 'chai'

import chaiEnzyme from 'chai-enzyme'
chai.use(chaiEnzyme())

import wrapper from '~/../test/component-wrapper'
import { Header } from './Header'

const props = (overrideProps) => {
  return Object.assign({}, {
    user: {},
  }, overrideProps || {})
}

describe('<Header/>', () => {
  const header = wrapper(<Header { ...props() } />)

  it('contains a header', () => {
    expect(header).to.have.tagName('header')
    expect(header).to.have.className('header')
  })

  it('does not render the Admin menu', () => {
    expect(header.find('.AdminMenu').length).to.equal(0)
  })

  context('for Admins', () => {
    const header = wrapper(<Header { ...props({adminAvailable: true}) } />)

    it('renders the Admin menu', () => {
      expect(header.find('.AdminMenu').length).to.equal(1)
    })
  })
})
