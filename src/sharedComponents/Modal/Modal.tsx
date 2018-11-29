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
  onClose?: (e: any) => void
}

class ModalWithoutRouter extends React.Component<IModalProps> {
  private wrapperRef: any
  private timeout: any

  public constructor(props: IModalProps) {
    super(props)
    this.wrapperRef = null
  }

  public componentDidMount() {
    const { closeTo, overlay, onClose } = this.props
    if ((closeTo && overlay) || (onClose && overlay)) {
      this.timeout = window.setTimeout(() => window.addEventListener('click', this.handleClickOutside), 200)
    }
  }
  
  public componentWillUnmount() {
    window.clearTimeout(this.timeout)
    window.removeEventListener('click', this.handleClickOutside)
  }

  public render() {
    const { className, closeTo, closeColor, overlay, children, onClose } = this.props
    return (
      <div
        ref={this.setWrapperRef}
        className={`modal${className ? ' ' + className : ''}${overlay ? ' overlay' : ''}`}
      >
        {closeTo || onClose
          ? (
            <Button onClick={this.closeModal} className={`close-modal-button${closeColor ? ' ' + closeColor : ' white'}`}>
              <i className="material-icons">clear</i>
            </Button>
          ): null}
        {children}
      </div>
    )
  }

  private setWrapperRef = (element: any) => {
    this.wrapperRef = element
  }

  private handleClickOutside = (event: any) => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.closeModal()
    }
  }

  private closeModal = (e?: any) => {
    if (e) {
      e.persist()
    }
    this.handleCloseTo()
    this.handleOnClose(e)
  }

  private handleCloseTo = () => {
    const { history, location, closeTo, overlay } = this.props

    if (closeTo && overlay && location.pathname !== closeTo) {
      console.log('CLOSING FROM MODAL')
      if (closeTo === 'GO_BACK') {
        history.goBack()
      } else {
        history.push(closeTo)
      }
    }
  }

  private handleOnClose = (e: any) => {
    if (this.props.onClose) {
      this.props.onClose(e)
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
