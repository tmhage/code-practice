import React, { Component, PropTypes } from 'react'
import { routerActions } from 'react-router-redux'
import { connect } from 'react-redux'
import { logout } from '../../actions/user'

const navigateTo = routerActions.push

// Material UI Components
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Subheader from 'material-ui/Subheader'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import { List, ListItem } from 'material-ui/List'
import IconMenu from 'material-ui/IconMenu'
import Avatar from 'material-ui/Avatar'

// Icons
import Home from 'material-ui/svg-icons/action/home'
import Settings from 'material-ui/svg-icons/action/settings'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import CoursesIcon from 'material-ui/svg-icons/navigation/apps'
import CommunityIcon from 'material-ui/svg-icons/communication/forum'
import Help from 'material-ui/svg-icons/action/help'

// Styles
import './Header.sass'

export class Header extends Component {
  constructor() {
    super()

    this.state = { open: false }
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleHome() {
    this.handleNavTo('/')
  }

  handleCourses() {
    this.handleNavTo('/courses')
  }

  handleAdminPlanning() {
    this.handleNavTo('/admin')
  }

  handleAdminTeachers() {
    this.handleNavTo('/admin/teachers')
  }

  handleAdminStudents() {
    this.handleNavTo('/admin/students')
  }

  handleNavTo(link) {
    this.setState({ open: false })
    const { navigateTo } = this.props
    navigateTo(link)
  }

  handleLogout() {
    const { logout, navigateTo } = this.props
    logout()
    navigateTo('/')
  }

  adminMenu() {
    const { navigateTo, adminAvailable } = this.props
    if (!adminAvailable) { return null }

    return (
        <ListItem
          className='AdminMenu'
          key='admin'
          primaryText="Admin"
          leftIcon={<Settings />}
          primaryTogglesNestedList={true}
          nestedItems={[
            <ListItem
              key='planning'
              insetChildren={true}
              primaryText='Plan Courses'
              className="nested-link"
              onClick={ this.handleAdminPlanning.bind(this) } />,

            <ListItem
              key='teachers'
              insetChildren={true}
              primaryText='Teachers'
              className="nested-link"
              onClick={ this.handleAdminTeachers.bind(this) } />,

            <ListItem
              key='students'
              insetChildren={true}
              primaryText='Students'
              className="nested-link"
              onClick={ this.handleAdminStudents.bind(this) } />
          ]}
        />
    )
  }

  render() {
    const { navigateTo, adminAvailable, userAvatar } = this.props

    return (
      <header className="header">
        <AppBar
          className="appbar"
          title="Home"
          onLeftIconButtonTouchTap={this.handleToggle}
          iconElementRight={
            <IconMenu
              className="icon-menu"
              iconButtonElement={
                <IconButton><Avatar className="avatar" src={userAvatar} /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
              <MenuItem primaryText="Profile" />
              <MenuItem primaryText="Sign out" onClick={ this.handleLogout.bind(this) } />
            </IconMenu>
          }
        />

        <Drawer
          width={300}
          docked={false}
          className="drawer"
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <List>
            <ListItem
              key='brand'
              className="heading"
              primaryText='Codaisseur Reader'/>

            <ListItem
              key='home'
              primaryText="Home"
              leftIcon={<Home />}
              onClick={ this.handleHome.bind(this) }/>

            <ListItem
              key='courses'
              primaryText="Courses"
              leftIcon={<CoursesIcon />}
              onClick={ this.handleCourses.bind(this) }/>

            { adminAvailable ? <Divider/> : null }

            { this.adminMenu() }

            <Divider />

            <Subheader>Resources</Subheader>

            <ListItem
              primaryText="Community"
              leftIcon={<CommunityIcon />}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key='blog'
                  insetChildren={true}
                  primaryText='Codaisseur Blog'
                  className="nested-link"
                  href='https://www.codaisseur.com/blog' />,

                <ListItem
                  key='forum'
                  insetChildren={true}
                  primaryText='Codaisseur Forum'
                  className="nested-link"
                  href='https://forum.codaisseur.com' />
              ]}
            />

            <ListItem
              key='help'
              primaryText="Help & Feedback"
              leftIcon={<Help />} />
          </List>
        </Drawer>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    userAvatar: state.user.avatar,
    adminAvailable: state.user.is_admin,
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, { navigateTo, logout })(Header)
