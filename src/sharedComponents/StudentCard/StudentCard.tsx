import * as React from "react";
import { gql } from "apollo-boost";
import { Mutation, Query } from "react-apollo";

import { GET_COURSE, Loading } from "src/Apps/TeacherHome/components";
import { IStudentUser, ITest } from "src/utils";
import { StudentNumberQueryFragment } from "./StudentNumber/StudentNumber";
import {
  OperatorRowQueryFragment,
  OperatorRow
} from "./OperatorRow/OperatorRow";
import { Card, ConfirmButton } from "..";
/*import { NewTestsIndicator } from './NewTestsIndicator/NewTestsIndicator'*/
import { NewTestsIndicatorQueryFragment } from "./NewTestsIndicator/NewTestsIndicator";
import "./StudentCard.css";

export const StudentCardQuery = gql`
  query student($id: ObjID, $courseId: ObjID) {
    student(id: $id) {
      id
      name
      tests(courseId: $courseId, limit: 0) {
        id
        ...StudentNumberQueryFragment
        ...OperatorRowQueryFragment
        ...NewTestsIndicatorQueryFragment
      }
      user {
        id
        email
        username
      }
    }
  }
  ${StudentNumberQueryFragment}
  ${OperatorRowQueryFragment}
  ${NewTestsIndicatorQueryFragment}
`;

const REMOVE_STUDENT_FROM_COURSE = gql`
  mutation removeStudentFromCourse($studentId: ObjID!, $courseId: ObjID!) {
    removeStudentFromCourse(studentId: $studentId, courseId: $courseId)
  }
`;

interface IStudentCardProps {
  studentId: string;
  courseId: string;
  showDeleteButton?: boolean;
}

export const StudentCard = ({
  studentId,
  courseId,
  showDeleteButton
}: IStudentCardProps) => {
  return (
    <Query
      query={StudentCardQuery}
      variables={{
        id: studentId,
        courseId
      }}
    >
      {({ data, loading }) => {
        if (loading) {
          return (
            <Card className="StudentCard" id={studentId}>
              <Loading />
            </Card>
          );
        }

        return (
          <Mutation
            mutation={REMOVE_STUDENT_FROM_COURSE}
            optimisticResponse={{ removeStudentFromCourse: true }}
            update={cache => {
              const { course }: any = cache.readQuery({
                query: GET_COURSE,
                variables: { id: courseId }
              });
              cache.writeQuery({
                query: GET_COURSE,
                data: {
                  course: {
                    ...course,
                    students:
                      course && course.students
                        ? course.students.filter(
                            (student: IStudentUser) => student.id !== studentId
                          )
                        : []
                  }
                }
              });
            }}
          >
            {removeStudentFromCourse => (
              <Card className="StudentCard" id={studentId}>
                <h3 className="name">
                  {name}
                  {data.student.user.email !== name
                    ? ` - ${data.student.user.email}`
                    : ""}
                </h3>

                {/*<NewTestsIndicator tests={tests} />*/}

                {showDeleteButton ? (
                  <ConfirmButton
                    className="delete"
                    confirmClassName="confirm"
                    onClick={() =>
                      removeStudentFromCourse({
                        variables: { studentId, courseId }
                      })
                    }
                  >
                    <span className="confirmation">
                      Remove student from this class?
                    </span>
                    <i className="material-icons">delete</i>
                  </ConfirmButton>
                ) : null}

                {[
                  {
                    operator: "addition",
                    symbol: "+",
                    color: "red",
                    tests: data.tests
                      ? data.student.tests.filter(
                          (test: ITest) => test.operator === "+"
                        )
                      : []
                  },
                  {
                    operator: "subtraction",
                    symbol: "-",
                    color: "blue",
                    tests: data.tests
                      ? data.student.tests.filter(
                          (test: ITest) => test.operator === "-"
                        )
                      : []
                  },
                  {
                    operator: "multiplication",
                    symbol: "*",
                    color: "green",
                    tests: data.student.tests
                      ? data.student.tests.filter(
                          (test: ITest) => test.operator === "*"
                        )
                      : []
                  },
                  {
                    operator: "division",
                    symbol: "/",
                    color: "yellow",
                    tests: data.student.tests
                      ? data.student.tests.filter(
                          (test: ITest) => test.operator === "/"
                        )
                      : []
                  }
                ].map(op => (
                  <OperatorRow key={op.operator} {...op} />
                ))}
              </Card>
            )}
          </Mutation>
        );
      }}
    </Query>
  );
};
