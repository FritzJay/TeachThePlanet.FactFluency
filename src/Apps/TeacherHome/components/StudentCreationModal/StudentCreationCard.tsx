import * as React from 'react'
import { Card, Button, Input } from 'src/sharedComponents';

interface IProps {
  name: string
  username: string
  password: string
  onPasswordChange: (name: string, password: string) => void
  onDelete: (name: string) => void
}

export class StudentCreationCard extends React.Component<IProps> {
  public render() {
    const { username, password } = this.props

    return (
      <Card className="student-card">
        <h4 className="username">{username}</h4>
        <Input
          className="password"
          name="password"
          value={password}
          onChange={this.handleChange}
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

  
  private handleChange = (e: any) => {
    const password = e.target.value
    this.props.onPasswordChange(this.props.name, password)
  }

  private handleDelete = () => {
    const { name, onDelete } = this.props
    onDelete(name)
  }
}