import * as React from 'react'
import { Card, Button, Input } from 'src/sharedComponents';

interface IProps {
  name: string
  username: string
  classCode: string
  onDelete: (name: string) => void
}

interface IState {
  password: string
}

export class StudentCreationCard extends React.Component<IProps, IState> {
  public state: IState = {
    password: this.props.classCode
  }

  public render() {
    const { username } = this.props

    return (
      <Card className="student-card">
        <h4 className="username">{username}</h4>
        <Input
          className="password"
          name="password"
          value={this.state.password}
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
    this.setState({ password: e.target.value })
  }

  private handleDelete = () => {
    const { name, onDelete } = this.props
    onDelete(name)
  }
}