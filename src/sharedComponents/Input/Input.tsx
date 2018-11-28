import * as React from 'react'
import './Input.css'

export const Input = ({ className, createRef, ...rest }: any) => {

  return <input {...rest} ref={createRef} className={`Input${className !== undefined ? ' ' + className : ''}`} />
}
