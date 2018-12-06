import * as React from 'react'

import { Button } from 'src/sharedComponents'
import { NavbarDropdownTrigger, NavbarDropdownMenu } from 'src/sharedComponents'
import { DeleteAccountButton } from './components/DeleteAccountButton'
import { LogoutButton } from './components/LogoutButton'
import './AccountSettingsDropdown.css'

export const AccountSettingsDropdownTrigger = ({ name }: { name: string }) => (
  <NavbarDropdownTrigger className="AccountSettingsDropdownTrigger" dropdownMenuId="AccountSettingsDropdown">
    <Button
      title='Account Settings'
    >
      {name}
      <i className="icon material-icons">
        account_circle
      </i>
    </Button>
  </NavbarDropdownTrigger>
)

export const AccountSettingsDropdownMenu = ({ userId, role }: { userId: string, role: string }) => (
  <NavbarDropdownMenu className="AccountSettingsDropdownMenu" id="AccountSettingsDropdown">
    <h2>Account Settings</h2>
    <LogoutButton />
    <DeleteAccountButton userId={userId} role={role} />
  </NavbarDropdownMenu>
)
