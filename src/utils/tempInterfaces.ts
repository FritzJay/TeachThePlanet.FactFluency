export interface INewTestParameters {
  testNumber: ITestNumber
  operator: string
}

export interface ITestNumber {
  number: number
  operators: string[]
}

export interface IAvailableTests {
  numbers: ITestNumber[]
}

export interface INewTestParameters {
  testNumber: ITestNumber
  operator: string
}

export interface IDisplayQuestion {
  bottom: string
  operator: string
  start?: Date
  top: string
}