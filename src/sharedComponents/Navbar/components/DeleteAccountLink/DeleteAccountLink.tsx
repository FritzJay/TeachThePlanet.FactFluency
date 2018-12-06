import * as React from 'react'
import { gql } from 'apollo-boost'
import { Mutation, Query } from 'react-apollo'
import { Redirect } from 'react-router'

import { Loading } from 'src/sharedComponents'

const GET_USER = gql`
  query user {
    user {
      id
      email
      role
    }
  }
`

const DELETE_STUDENT = gql`
  mutation removeStudent {
    removeStudent
  }
`

const DELETE_TEACHER = gql`
  mutation removeTeacher {
    removeTeacher
  }
`

export const DeleteAccountLink = () => (
  <Query query={GET_USER} >
    {({ client, loading, data: { user: { email, role } } }) => (
      <Mutation
        mutation={role.toLowerCase() === 'teacher' ? DELETE_TEACHER : DELETE_STUDENT}
        onCompleted={() => {
          client.clearStore()
        }}
      >
        {(deleteAccount, { called }) => {
          if (email === 'TTPStudent') {
            return null
          }

          if (loading) {
            return <Loading />
          }

          if (called) {
            return <Redirect to="/index" />
          }

          return (
            <a
              className="DeleteAccountLink navbar-link"
              onClick={() => deleteAccount()}
            >
              Delete Account
            </a>
          )
        }}
      </Mutation>
    )}
  </Query>
)