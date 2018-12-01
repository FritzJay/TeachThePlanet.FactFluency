import * as React from 'react'
import { gql } from 'apollo-boost'

import { ITest, getOperatorSymbol } from 'src/utils'
import { StudentNumber } from '../StudentNumber/StudentNumber'
import './OperatorRow.css'

export const OperatorRowQueryFragment = gql`
  fragment OperatorRowQueryFragment on Test {
    id
    number
    operator
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

  return (
    <div className={`OperatorRow ${operator}`}>
      <button className={`operator ${color}`}>{getOperatorSymbol(symbol)}</button>
      {numbers.map((num) => (
        <StudentNumber
          key={num}
          num={num}
          tests={tests.filter((test) => test.number === num)}
      />))}
    </div>
  )
}