import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import NavbarDropdownProvider from './components/NavbarDropdownProvider/NavbarDropdownProvider'
import { NavbarDropdownTrigger } from './components/NavbarDropdownProvider/NavbarDropdownTrigger'
import { NavbarDropdownMenu } from './components/NavbarDropdownProvider/NavbarDropdownMenu'
import Logo from 'src/images/logo.svg'
import './Navbar.css'

export * from './components/ClassListDropdown/ClassListDropdown'
export * from './components/AccountSettingsDropdown/AccountSettingsDropdown'
export * from './components/Dropdown/Dropdown'

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
    const { logoLink, children } = this.props

    const childrenArray = React.Children.toArray(children)
    const firstHalf = childrenArray.slice(0, Math.ceil(childrenArray.length / 2))
    const secondHalf = childrenArray.slice(Math.ceil(childrenArray.length / 2), childrenArray.length)

    return (
      <NavbarDropdownProvider>
        <div
          ref={this.setWrapperRef}
          className="Navbar"
        >
          <div className="second-half-of-children">
            {secondHalf}
          </div>

          <Link className="logo" to={logoLink}>
            <img src={Logo} className="logo-img" alt="logo" />
          </Link>

          <div className="first-half-of-children">
            {firstHalf}
          </div>

          <NavbarDropdownTrigger
            className="toggle-btn"
            dropdownMenuId='smallScreenDropdown'
          >
            <i className="material-icons">menu</i>
          </NavbarDropdownTrigger>

          <NavbarDropdownMenu className="small-screen-dropdown" id="smallScreenDropdown">
            {firstHalf}
            {secondHalf}
          </NavbarDropdownMenu>
        </div>
      </NavbarDropdownProvider>
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
