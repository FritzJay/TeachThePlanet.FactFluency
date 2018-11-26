import { gql } from "apollo-boost"

export const factFluencyResolvers = () => ({
  Query: {
    test: (_obj: any, _variables: any, { cache }: any) => cache.readQuery({ query: gql`
      query test {
        test
      }
    `})
  }
})

export const factFluencyDefaults = () => ({
  test: { test: 'Test'},
  testResults: null,
})

export const factFluencyTypeDefs = () => ''