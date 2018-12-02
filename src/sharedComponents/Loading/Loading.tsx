import * as React from 'react'

import './Loading.css'

interface IProps {
  className?: string
}

export const Loading = ({ className }: IProps) => (
  <div className={`Loading${className ? ' ' + className : ''}`} />
)