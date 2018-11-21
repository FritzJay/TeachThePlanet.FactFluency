import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { Button } from '..'
import './Modal.css'

interface IModalProps extends RouteComponentProps<{}> {
  history: any
  className?: string
  children: any
  color?: string
  overlay?: boolean
  closeTo?: string
  closeColor?: string
}

class ModalWithoutRouter extends React.Component<IModalProps> {
  private wrapperRef: any
  private timeout: any

  public componentDidMount() {
    const { closeTo, overlay } = this.props
    if (closeTo && overlay) {
      this.timeout = window.setTimeout(() => window.addEventListener('click', this.handleClickOutside), 200)
    }
  }
  
  public componentWillUnmount() {
    window.clearTimeout(this.timeout)
    window.removeEventListener('click', this.handleClickOutside)
  }

  public render() {
    const { className, closeTo, closeColor, overlay, children } = this.props
    return (
      <div
        ref={this.setWrapperRef}
        className={`modal${className ? ' ' + className : ''}${overlay ? ' overlay' : ''}`}
      >
        {closeTo
          ? (
            <Button onClick={this.closeModal} className={`close-modal-button${closeColor ? ' ' + closeColor : ' white'}`}>
              <i className="material-icons">clear</i>
            </Button>
          ): null}
        {children}
      </div>
    )
  }
  
  private setWrapperRef = (node: any) => {
    this.wrapperRef = node
  }

  private handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.closeModal()
    }
  }

  private closeModal = () => {
    const { history, closeTo, overlay } = this.props
    if (closeTo && overlay) {
      if (closeTo === 'GO_BACK') {
        history.goBack()
      } else {
        history.push(closeTo)
      }
    }
  }
}

export const Modal = withRouter<IModalProps>(ModalWithoutRouter)

interface IModalContentProps {
  className?: string
  children?: any
}

export const ModalHeader = (props: IModalContentProps) => {
  return (
    <div className={`header${props.className ? ' ' + props.className : ''}`}>
      {props.children}
    </div>
  );
}

export const ModalContent = (props: IModalContentProps) => {
  return (
    <div className={`content ${props.className ? ' ' + props.className : ''}`}>
      {props.children}
    </div>
  );
}
