import * as React from 'react'

import { NavbarDropdownContext, INavbarDropdownContext } from './NavbarDropdownProvider'

interface IProps {
  dropdownMenuId: string
  className?: string
  children: any
  onClick?: () => void
}

export const NavbarDropdownTrigger = ({ children, className, dropdownMenuId, onClick }: IProps) => (
  <NavbarDropdownContext.Consumer>
    {({ toggleDropdownMenu }: INavbarDropdownContext) => (
      <div
        className={`${className ? className : ''}`}
        onClick={() => toggleDropdownMenu(dropdownMenuId)}
      >
        {children}
      </div>
    )}
  </NavbarDropdownContext.Consumer>
)