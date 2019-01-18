import * as React from "react";
import gql from "graphql-tag";
import { Mutation, ApolloConsumer } from "react-apollo";
import { RouteComponentProps, Redirect } from "react-router";

import { TestNumber } from "./TestNumber/TestNumber";
import { themeColors, IClass, IStudentUser } from "src/utils";
import { Loading, StudentCard } from "src/sharedComponents";
import { TakeTestQueryFragment } from "../TakeTest/TakeTest";
import { QUERY } from "src/Apps/FactFluency/FactFluency";
import "./SelectTest.css";

export const SelectTestQueryFragment = gql`
  fragment SelectTestQueryFragment on Course {
    id
    name
    teacher {
      id
      name
    }
    testParameters {
      id
      operators
      numbers
    }
  }
`;

export const SelectTestCacheFragment = `
  activeCourseId @client
`;

export const CREATE_TEST = gql`
  mutation createTest($input: CreateTestInput!) {
    createTest(input: $input) {
      id
      ...TakeTestQueryFragment
    }
  }
  ${TakeTestQueryFragment}
`;

interface IProps extends RouteComponentProps {
  activeCourseId: string;
  courses: IClass[];
  studentId?: string;
  testId?: string;
  student: IStudentUser;
}

interface IState {
  selectedNumber?: number;
}

export class SelectTest extends React.Component<IProps, IState> {
  public state: IState = {};

  public async componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  public componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  public render() {
    const { activeCourseId, courses, studentId, testId, student } = this.props;

    return (
      <ApolloConsumer>
        {client => (
          <Mutation
            mutation={CREATE_TEST}
            onCompleted={({ createTest }) => {
              client.writeData({ data: { testId: createTest.id } });
            }}
            refetchQueries={[{ query: QUERY }]}
          >
            {(
              createTest,
              { loading: mutationLoading, error: mutationError }: any
            ) => {
              if (testId !== undefined && testId !== null) {
                return <Redirect to="/fact-fluency/start-test" />;
              }
              if (mutationLoading) {
                return (
                  <div className="SelectTest">
                    <Loading className="loading" />
                  </div>
                );
              }

              if (mutationError) {
                throw mutationError;
              }

              const activeCourse = activeCourseId
                ? courses &&
                  courses.find((course: IClass) => course.id === activeCourseId)
                : courses && courses[0];

              const numbers = activeCourse
                ? activeCourse.testParameters.numbers.sort((a, b) => a - b)
                : new Array(13).fill(0).map((n, i) => i);

              const operators = activeCourse
                ? activeCourse.testParameters.operators
                : ["+", "-", "*", "/"];

              return (
                <div className="SelectTest">
                  <div className="cards">
                    {numbers.map((num: number, i: number) => (
                      <TestNumber
                        active={num === this.state.selectedNumber}
                        color={themeColors[i % themeColors.length]}
                        key={num}
                        num={num}
                        operators={operators}
                        onClick={this.handleTestNumberClick}
                        onSubmit={(operator: string) => {
                          createTest({
                            variables: {
                              input: {
                                number: num,
                                operator,
                                studentId,
                                courseId: activeCourse && activeCourse.id
                              }
                            },
                            update: (
                              cache,
                              { data: { createTest: results } }: any
                            ) => {
                              cache.writeFragment({
                                id: results.id,
                                fragment: TakeTestQueryFragment,
                                data: {
                                  ...results,
                                  __typename: "Test"
                                }
                              });
                            }
                          });
                        }}
                      />
                    ))}
                  </div>

                  {student.user.email !== "TTPStudent" ? (
                    <>
                      <hr />
                      {activeCourse ? (
                        <h1 className="student-card-header">
                          {activeCourse.name} - {activeCourse.teacher.name}
                        </h1>
                      ) : null}
                      <StudentCard
                        courseId={activeCourseId}
                        studentId={student.id}
                        showDeleteButton={false}
                      />
                    </>
                  ) : null}
                </div>
              );
            }}
          </Mutation>
        )}
      </ApolloConsumer>
    );
  }

  private handleTestNumberClick = (selectedNumber: number) => {
    this.setState({ selectedNumber });
  };

  private handleScroll = () => {
    if (this.state.selectedNumber !== undefined) {
      this.setState({ selectedNumber: undefined });
    }
  };
}
