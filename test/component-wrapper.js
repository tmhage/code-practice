import React from 'react'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '~/assets/styles/theme'
import { shallow, mount, render } from 'enzyme'
import store from '~/store'

export default (node, nodeContext = {}) => {
  let context = Object.assign({}, nodeContext, { store })
  return mount(
    <Provider store={store}>
      <MuiThemeProvider>
        {node}
      </MuiThemeProvider>
    </Provider>, { context })
}
