import * as React from 'react'
import { Query } from 'react-apollo'

import { Button, ClassListNotification, GET_STUDENT, Loading } from 'src/sharedComponents'
import { NavbarDropdownTrigger } from '../NavbarDropdown'
import './ClassListDropdownTrigger.css'

export * from './components/ClassListNotification/ClassListNotification'

export const ClassListDropdownTrigger = () => (
  <NavbarDropdownTrigger
    className="ClassListDropdownTrigger"
    dropdownMenuId="ClassListDropdownMenu"
  >
    <Query
      query={GET_STUDENT}
      partialRefetch={true}
    >
      {({ data, loading }) => {
        if (loading) {
          return <Loading />
        }

        const numberOfInvitations = data.studentByToken.courseInvitationsByStudentIdList.length

        return (
          <Button title={`You have ${numberOfInvitations} class invitation${numberOfInvitations !== 1 ? 's' : ''}`}>
            Classes
            <i className="icon material-icons">
              school
            </i>
            <ClassListNotification numberOfNotifications={numberOfInvitations} />
          </Button>
        )
      }}
    </Query>
  </NavbarDropdownTrigger>
)