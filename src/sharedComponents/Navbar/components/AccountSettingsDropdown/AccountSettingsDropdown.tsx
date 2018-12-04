import * as React from 'react'
import { gql, ApolloClient } from 'apollo-boost'
import { Mutation, Query } from 'react-apollo'
import { Redirect, withRouter, RouteComponentProps } from 'react-router'

import { clearCached } from 'src/utils'
import { Loading, Button, Modal, ModalHeader, ModalContent, ConfirmButton } from 'src/sharedComponents'
import './AccountSettingsDropdown.css'
import { NavbarDropdownTrigger, NavbarDropdownMenu } from 'src/Apps/Login/components';

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

interface IProps extends RouteComponentProps<{}> {}

interface IState {
  active: boolean
}

export class AccountSettingsDropdownWithoutRouter extends React.Component<IProps, IState> {
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
                  <NavbarDropdownTrigger dropdownMenuId="AccountSettingsDropdown">
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
                  </NavbarDropdownTrigger>

                  <NavbarDropdownMenu className="AccountSettingsDropdownMenu" id="AccountSettingsDropdown">
                    <ul>
                      <li>
                        <Button onClick={() => this.handleLogout(client)}>
                          Logout
                        </Button>
                      </li>
                      <li>
                        <ConfirmButton
                          onClick={() => deleteAccount({ variables: { id }})}
                          className="delete-button"
                          confirmClassName="confirm"
                        >
                          <span className="default">Delete Account</span>
                          <span className="confirmation">Are you sure?</span>
                        </ConfirmButton>
                      </li>
                    </ul>
                  </NavbarDropdownMenu>

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
                            <ConfirmButton
                              onClick={() => deleteAccount({ variables: { id }})}
                              className="delete-button"
                              confirmClassName="confirm"
                            >
                              <span className="default">Delete Account</span>
                              <span className="confirmation">Are you sure?</span>
                            </ConfirmButton>
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

export const AccountSettingsDropdown = withRouter(AccountSettingsDropdownWithoutRouter)