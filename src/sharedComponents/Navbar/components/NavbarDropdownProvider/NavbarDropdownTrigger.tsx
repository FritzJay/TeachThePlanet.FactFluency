import * as React from 'react'

import { Button } from 'src/sharedComponents'
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
      <Button
        className={`${className ? className : ''}`}
        onClick={() => {
          if (onClick) {
            onClick()
          }
          toggleDropdownMenu(dropdownMenuId)
        }}
      >
        {children}
      </Button>
    )}
  </NavbarDropdownContext.Consumer>
)