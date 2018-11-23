import * as React from 'react'
import './Input.css'

export const Input = ({ className, ...rest }: any) => {

  return <input {...rest} className={`Input${className !== undefined ? ' ' + className : ''}`} />
}
