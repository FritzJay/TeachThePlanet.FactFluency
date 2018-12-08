import * as React from 'react'

import { Card, Button, Input } from 'src/sharedComponents'

interface IProps {
  name: string
  password: string
  username: string
  onPasswordChange: (id: string, password: string) => void
  onUsernameChange: (id: string, username: string) => void
  onDelete: (name: string) => void
}

export class StudentCreationCard extends React.Component<IProps> {
  public render() {
    const { password, username } = this.props

    return (
      <Card className="student-card">
        <Input
          className="username"
          name="username"
          value={username}
          onChange={this.handleUsernameChange}
        />
        <Input
          className="password"
          name="password"
          value={password}
          onChange={this.handlePasswordChange}
        />
        <Button
          className="remove"
          onClick={this.handleDelete}
        >
          <i className="material-icons">clear</i>
        </Button>
      </Card>
    )
  }

  private handlePasswordChange = (e: any) => {
    const password = e.target.value
    this.props.onPasswordChange(this.props.name, password)
  }

  private handleUsernameChange = (e: any) => {
    const username = e.target.value
    this.props.onUsernameChange(this.props.name, username)
    this.setState({ username })
  }

  private handleDelete = () => {
    const { name, onDelete } = this.props
    onDelete(name)
  }
}