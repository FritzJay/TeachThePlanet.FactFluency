import { ITeacher } from "src/utils"

export const SIGN_IN_TEACHER = 'SIGN_IN_TEACHER'

export const signInTeacher = (teacher: ITeacher) => ({
  type: SIGN_IN_TEACHER,
  teacher,
})