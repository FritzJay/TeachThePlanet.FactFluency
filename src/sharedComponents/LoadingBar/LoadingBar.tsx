import * as React from 'react'
import { connect } from 'react-redux'
import { LoadingBar as LibLoadingBar } from 'react-redux-loading'
import './LoadingBar.css'

const Component = () => (
  <div className="LoadingBar">
    <LibLoadingBar style={{ height: '10px' }} />
  </div>
)

export const LoadingBar = connect()(Component)