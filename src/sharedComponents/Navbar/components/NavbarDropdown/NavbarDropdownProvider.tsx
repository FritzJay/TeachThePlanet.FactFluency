import * as React from 'react'

export const NavbarDropdownContext = React.createContext({
  activeDropdownMenu: null,
  lastActiveDropdownMenu: null,
  dropdownMenus: [],
  toggleDropdownMenu: (id: string) => { return },
  addDropdownMenu: (id: string) => { return },
  removeDropdownMenu: (id: string) => { return },
})

export interface INavbarDropdownContext {
  activeDropdownMenu: string | null
  lastActiveDropdownMenu: string | null
  dropdownMenus: string[]
  toggleDropdownMenu: (id: string) => void
  addDropdownMenu: (id: string) => void
  removeDropdownMenu: (id: string) => void
}

interface IProps {
  children: any
}

interface IState {
  activeDropdownMenu: string | null
  lastActiveDropdownMenu: string | null
  dropdownMenus: string[]
}

export class NavbarDropdownProvider extends React.Component<IProps, IState> {
  public state = {
    activeDropdownMenu: null,
    lastActiveDropdownMenu: null,
    dropdownMenus: [],
  }

  public componentDidMount() {
    window.addEventListener('resize', this.handleWindowResize)
  }

  public componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize)
  }

  public render() {
    const { activeDropdownMenu, lastActiveDropdownMenu, dropdownMenus } = this.state

    return (
      <NavbarDropdownContext.Provider value={{
        activeDropdownMenu,
        lastActiveDropdownMenu,
        dropdownMenus,
        toggleDropdownMenu: this.toggleDropdownMenu,
        addDropdownMenu: this.addDropdownMenu,
        removeDropdownMenu: this.removeDropdownMenu,
      }}>
        {this.props.children}
      </NavbarDropdownContext.Provider>
    )
  }

  private toggleDropdownMenu = (id: string): void => {
    this.setState((prevState) => {
      if (prevState.activeDropdownMenu === id) {
        return ({
          activeDropdownMenu: null,
          lastActiveDropdownMenu: prevState.activeDropdownMenu,
        })
      }
      return ({
        activeDropdownMenu: id,
        lastActiveDropdownMenu: prevState.activeDropdownMenu,
      })
    })
  }

  private addDropdownMenu = (id: string): void => {
    this.setState((prevState) => ({
      dropdownMenus: prevState.dropdownMenus.concat(id)
    }))
  }

  private removeDropdownMenu = (id: string): void => {
    this.setState((prevState) => ({
      dropdownMenus: prevState.dropdownMenus.filter(dropdownId => dropdownId !== id)
    }))
  }

  private handleWindowResize = () => {
    this.setState((prevState) => ({
      activeDropdownMenu: null,
      lastActiveDropdownMenu: prevState.activeDropdownMenu,
    }))
  }
}