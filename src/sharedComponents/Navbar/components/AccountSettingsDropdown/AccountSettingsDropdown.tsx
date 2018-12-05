import * as React from 'react'

import { Button, ConfirmButton } from 'src/sharedComponents'
import './AccountSettingsDropdown.css'
import { NavbarDropdownTrigger, NavbarDropdownMenu } from 'src/Apps/Login/components'

interface IProps {
  name: string
}

export const AccountSettingsDropdown = ({ name }: IProps) => (
  <div className="AccountSettingsDropdownContainer">
    <NavbarDropdownTrigger className="AccountSettingsDropdownTrigger" dropdownMenuId="AccountSettingsDropdown">
      <Button
        className="AccountSettingsDropdown-button"
        title='Account Settings'
      >
        {name}
        <i className="icon material-icons">
          account_circle
        </i>
      </Button>
    </NavbarDropdownTrigger>

    <NavbarDropdownMenu className="AccountSettingsDropdownMenu dropdown" id="AccountSettingsDropdown">
      <Button className="logout-button">
        Logout
      </Button>
      <ConfirmButton
        className="delete-button"
        confirmClassName="confirm"
      >
        <span className="default">Delete Account</span>
        <span className="confirmation">Are you sure?</span>
      </ConfirmButton>
    </NavbarDropdownMenu>
  </div>
)
