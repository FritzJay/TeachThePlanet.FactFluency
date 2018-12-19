import * as React from 'react'
import { gql } from 'apollo-boost'

import { ITest, getOperatorSymbol } from 'src/utils'
import { StudentNumber } from '../StudentNumber/StudentNumber'
import './OperatorRow.css'

export const OperatorRowQueryFragment = gql`
  fragment OperatorRowQueryFragment on Test {
    nodeId
    id
    number
    operator
    correct
    testParameterByTestParametersId {
      nodeId
      id
      passing
    }
  }
`

interface IProps {
  operator: string
  symbol: string
  color: string
  tests: ITest[]
}

export const OperatorRow = ({ operator, symbol, color, tests }: IProps) => {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const passing = tests.filter((test) => test && test.correct && test.correct >= test.testParameterByTestParametersId.passing).length
  const operatorSymbol = getOperatorSymbol(symbol)

  return (
    <div className={`OperatorRow ${operator}`}>
      <button
        className={`operator ${color}`}
        title={`${operatorSymbol}: ${tests.length} attempt${tests.length === 1 ? '' : 's'}. ${passing} pass${passing === 1 ? '' : 'es'}`}
      >
        {operatorSymbol}
      </button>
      {numbers.map((num) => (
        <StudentNumber
          key={num}
          num={num}
          operatorSymbol={operatorSymbol}
          tests={tests.filter((test) => test.number === num)}
      />))}
    </div>
  )
}