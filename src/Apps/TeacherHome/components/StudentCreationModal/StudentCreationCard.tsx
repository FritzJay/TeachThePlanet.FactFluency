import * as React from 'react'
import { Card, Button } from 'src/sharedComponents';

interface IProps {
  name: string
  username: string
  classCode: string
  onDelete: (name: string) => void
}

export class StudentCreationCard extends React.Component<IProps> {
  public render() {
    const { username, classCode } = this.props

    return (
      <Card className="student-card">
        <h4 className="username">{username}</h4>
        <h4 className="password">{classCode}</h4>
        <Button
          className="remove"
          onClick={this.handleDelete}
        >
          <i className="material-icons">clear</i>
        </Button>
      </Card>
    )
  }

  private handleDelete = () => {
    const { name, onDelete } = this.props
    onDelete(name)
  }
}