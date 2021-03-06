import * as React from 'react'
import { gql } from 'apollo-boost'

import { ITest } from 'src/utils'
import './NewTestsIndicator.css'

export const NewTestsIndicatorQueryFragment = gql`
  fragment NewTestsIndicatorQueryFragment on Test {
    id
    end
  }
`

export const NewTestsIndicatorCacheFragment = `
  newTestsCheckedAt @client
`

interface IProps {
  tests: ITest[]
}

export const NewTestsIndicator = ({ tests }: IProps) => {
  const newTestsCheckedAt = localStorage.getItem('newTestsCheckedAt') || '0'
  const newTests = tests.filter((test) => (test.end !== undefined)
    || (test.end !== undefined && test.end > parseInt(newTestsCheckedAt, 10))
  ).length

  if (newTests === 0) {
    return null
  }

  return (
    <div className="NewTestsIndicator">
      <h4 className="text">{`${newTests} new test${newTests > 1 ? 's' : ''}!`}</h4>
    </div>
  )
}