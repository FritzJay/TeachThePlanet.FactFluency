import * as React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Link, RouteComponentProps, Route } from 'react-router-dom'

import NavbarDropdownProvider from './components/NavbarDropdownProvider/NavbarDropdownProvider'
import { NavbarDropdownTrigger } from './components/NavbarDropdownProvider/NavbarDropdownTrigger'
import { NavbarDropdownMenu } from './components/NavbarDropdownProvider/NavbarDropdownMenu'
import { AccountSettingsDropdown } from './components/AccountSettingsDropdown/AccountSettingsDropdown'
import { ConnectedClassListDropdown, Button } from 'src/Apps/Login/components'
import Logo from 'src/images/logo.svg'
import './Navbar.css'

export * from './components/ClassListDropdown/ClassListDropdown'
export * from './components/AccountSettingsDropdown/AccountSettingsDropdown'
export * from './components/NavbarDropdownProvider/NavbarDropdownTrigger'
export * from './components/NavbarDropdownProvider/NavbarDropdownMenu'

const GET_USER = gql`
  query user {
    user {
      id
      email
      username
    }
  }
`

interface IProps extends RouteComponentProps<{}> {
  logoLink: string
}

interface IState {
  activeDropdown: boolean
}

export class Navbar extends React.Component<IProps, IState> {
  public state: IState = {
    activeDropdown: false,
  }

  private wrapperRef: any

  public componentWillUnmount() {
    window.removeEventListener('click', this.handleClickOutside)
  }

  public render() {
    const { logoLink } = this.props

    return (
      <Query query={GET_USER}>
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          
          const { email, username } = data.user

          return (
            <NavbarDropdownProvider>
              <div
                ref={this.setWrapperRef}
                className="Navbar"
              >
                {email === 'TTPStudent'
                  ? null
                  : (
                    <Route
                      path="/"
                      render={() => <AccountSettingsDropdown name={username || email} />}
                    />
                )}

                <Link className="logo" to={logoLink}>
                  <img src={Logo} className="logo-img" alt="logo" />
                </Link>

                {email === 'TTPStudent'
                  ? null
                  : (
                    <Route
                      path="/teacher"
                      component={ConnectedClassListDropdown}
                    />
                )}

                <NavbarDropdownTrigger
                  className="toggle-btn"
                  dropdownMenuId='smallScreenDropdown'
                >
                  <Button>
                    <i className="material-icons">menu</i>
                  </Button>
                </NavbarDropdownTrigger>

                <NavbarDropdownMenu className="small-dropdown" id="smallScreenDropdown">
                  {email === 'TTPStudent'
                    ? null
                    : (
                      <Route
                        path="/"
                        render={() => <AccountSettingsDropdown name={username || email} />}
                      />
                  )}
                  {email === 'TTPStudent'
                    ? null
                    : (
                      <Route
                        path="/teacher"
                        component={ConnectedClassListDropdown}
                      />
                  )}
                </NavbarDropdownMenu>
              </div>
            </NavbarDropdownProvider>
          )
        }}
      </Query>
    )
  }

  private setWrapperRef = (node: any) => {
    this.wrapperRef = node
  }

  private handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.handleToggleButtonClick()
    }
  }

  private handleToggleButtonClick = () => {
    if (!this.state.activeDropdown) {
      window.addEventListener('click', this.handleClickOutside)
    } else {
      window.removeEventListener('click', this.handleClickOutside)
    }

    this.setState((prevState: IState) => ({
      activeDropdown: !prevState.activeDropdown
    }))
  }
}
