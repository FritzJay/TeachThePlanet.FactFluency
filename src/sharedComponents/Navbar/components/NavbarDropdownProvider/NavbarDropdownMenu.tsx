import * as React from 'react'

import { NavbarDropdownContext, INavbarDropdownContext } from './NavbarDropdownProvider'
import './NavbarDropdownMenu.css'

interface IPropsWithoutContext {
  id: string
  className?: string
  children: any
}

interface IState {
  visible: boolean
}

export const NavbarDropdownMenu = (props: IPropsWithoutContext) => (
  <NavbarDropdownContext.Consumer>
    {context => (
      <NavbarDropdownMenuWithContext {...props} context={context} />
    )}
  </NavbarDropdownContext.Consumer>
)

interface IProps extends IPropsWithoutContext {
  context: INavbarDropdownContext
}

class NavbarDropdownMenuWithContext extends React.Component<IProps, IState> {
  public static contextType = NavbarDropdownContext

  public static getDerivedStateFromProps(props: IProps) {
    if (props.context.activeDropdownMenu === props.id) {
      return { visible: true }
    }
    return { visible: false }
  }

  public state: IState = {
    visible: false
  }

  public componentDidMount() {
    this.context.addDropdownMenu(this.props.id)
  }

  public render() {
    const { children, className } = this.props
    const { visible } = this.state
    return (
      <div className={`NavbarDropdownMenu${className ? ' ' + className : ''}${visible ? '' : ' hidden'}`}>
        {children}
      </div>
    )
  }
}