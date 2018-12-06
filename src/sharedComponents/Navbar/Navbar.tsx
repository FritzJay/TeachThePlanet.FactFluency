import * as React from 'react'
import { Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import { Link, RouteComponentProps, Route } from 'react-router-dom'

import { NavbarDropdownProvider, NavbarDropdownTrigger, NavbarDropdownMenu, NavbarDropdownContext } from './components/NavbarDropdown'
import { AccountSettingsDropdownTrigger, AccountSettingsDropdownMenu } from './components/AccountSettingsDropdown/AccountSettingsDropdown'
import { ConnectedClassListDropdownMenu, ClassListDropdownTrigger } from './components/ClassListDropdown'
import { Button } from 'src/Apps/Login/components'
import Logo from 'src/images/logo.svg'
import './Navbar.css'

export * from './components/ClassListDropdown/ClassListDropdownMenu'
export * from './components/AccountSettingsDropdown/AccountSettingsDropdown'
export * from './components/ClassListDropdown'
export * from './components/NavbarDropdown'

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

  public render() {
    const { logoLink } = this.props

    return (
      <Query query={GET_USER}>
        {({ loading, data }) => {
          if (loading) {
            return null
          }
          
          const { email, username, id } = data.user

          return (
            <NavbarDropdownProvider>
              <div className="Navbar">
                <NavbarDropdownContext.Consumer>
                    {({ activeDropdownMenu }) => (
                      <div className={`navbar-container${activeDropdownMenu !== null ? ' dropdown-is-active' : ''}`}>
                        {email === 'TTPStudent'
                          ? null
                          : <AccountSettingsDropdownTrigger name={username || email} />
                        }

                        <Link className="logo" to={logoLink}>
                          <img src={Logo} className="logo-img" alt="logo" />
                        </Link>

                        {email === 'TTPStudent'
                          ? null
                          : (
                            <Route
                              path="/fact-fluency"
                              component={ClassListDropdownTrigger}
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
                      </div>
                    )}
                </NavbarDropdownContext.Consumer>                

                <div className="dropdown-menu-container">
                  <NavbarDropdownMenu className="small-screen-dropdown" id="smallScreenDropdown">
                    {email === 'TTPStudent'
                      ? null
                      : <AccountSettingsDropdownTrigger name={username || email} />
                    }
                    {email === 'TTPStudent'
                      ? null
                      : (
                        <Route
                          path="/fact-fluency"
                          component={ClassListDropdownTrigger}
                        />
                    )}
                  </NavbarDropdownMenu>

                  <AccountSettingsDropdownMenu userId={id} />
                  <Route
                    path="/fact-fluency"
                    component={ConnectedClassListDropdownMenu}
                  />
                </div>
              </div>
            </NavbarDropdownProvider>
          )
        }}
      </Query>
    )
  }
}
