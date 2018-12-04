import * as React from 'react'
import { gql, ApolloClient } from 'apollo-boost'
import { Mutation, Query } from 'react-apollo'
import { Redirect } from 'react-router'

import { clearCached } from 'src/utils'
import { Loading, Button, Modal, ModalHeader } from 'src/sharedComponents'
import './AccountSettingsDropdown.css'
import { ModalContent } from 'src/Apps/Login/components';

const GET_USER = gql`
  query user {
    user {
      id
      email
      username
    }
  }
`

const DELETE_ACCOUNT = gql`
  mutation removeUser {
    removeUser
  }
`

interface IProps {
  history: any
}

interface IState {
  active: boolean
}

export class AccountSettingsDropdown extends React.Component<IProps, IState> {
  public state: IState = {
    active: false,
  }

  public render() {
    const { active } = this.state

    return (
      <Query query={GET_USER} >
        {({ client, loading, data }) => (
          <Mutation
            mutation={DELETE_ACCOUNT}
            onCompleted={() => this.handleLogout(client)}
          >
            {(deleteAccount, { called }) => {
              if (loading) {
                return (
                  <div className="ClassListDropdown">
                    <Loading />
                  </div>
                )
              }

              const  { id, email, username } = data.user

              if (email === 'TTPStudent') {
                return null
              }

              if (called) {
                return <Redirect to="/index" />
              }

              return (
                <>
                  <Button
                    className={`AccountSettingsDropdown-button${active ? ' active' : ''}`}
                    onClick={this.toggleDropdown}
                    title='Account Settings'
                  >
                    {username || email}
                    <i className="icon material-icons">
                      account_circle
                    </i>
                  </Button>

                  {active ?
                    <Modal
                      className="AccountSettingsDropdown"
                      overlay={true}
                      onClose={this.toggleDropdown}
                    >
                      <ModalHeader className="header">
                        <h2>Account Settings</h2>
                      </ModalHeader>
                      <ModalContent className="content">
                        <ul>
                          <li>
                            <Button onClick={() => this.handleLogout(client)}>
                              Logout
                            </Button>
                          </li>
                          <li>
                            <Button
                              onClick={() => deleteAccount({ variables: { id }})}
                              >
                              Delete Account
                            </Button>
                          </li>
                        </ul>
                      </ModalContent>
                    </Modal>
                  : null}
                </>
              )
            }}
          </Mutation>
        )}
      </Query>
    )
  }

  private toggleDropdown = () => {
    this.setState((prevState) => ({
      active: !prevState.active,
    }))
  }

  private handleLogout = async (client: ApolloClient<any>) => {
    this.props.history.push('/index')
    await client.clearStore()
    await clearCached()
  }
}
