import * as React from 'react'
import './Input.css'

export const Input = (props: any) => {
  const className = props.className
    ? `${props.className} Input`
    : 'Input'

  return <input {...props} className={className} />
}
