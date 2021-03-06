import * as React from 'react'
import { gql } from 'apollo-boost'

import { ITest } from 'src/utils'
import './StudentNumber.css'

export const StudentNumberQueryFragment = gql`
fragment StudentNumberQueryFragment on Test {
  id
  testResults {
    correct
    needed
  }
}
`

interface IProps {
num: number
tests: ITest[]
operatorSymbol: string
}

export const StudentNumber = ({ num, tests, operatorSymbol }: IProps) => {
const passing = tests.filter((test) => test.testResults && test.testResults.correct >= test.testResults.needed).length
let className
if (tests.length === undefined || tests.length === null || tests.length === 0) {
  className = ' not-taken'
} else if (passing === 0) {
  className = ' in-progress'
} else if (passing === 1) {
  className = ' passed-once'
} else if (passing === 2) {
  className = ' passed-twice'
} else if (passing >= 3) {
  className = ' passed'
}

return (
  <button 
    key={num}
    className={`StudentNumber${className}`}
    title={`${operatorSymbol} ${num}: ${tests.length} attempt${tests.length === 1 ? '' : 's'}. ${passing} pass${passing === 1 ? '' : 'es'}`}
  >
    {num}
  </button>
)
}