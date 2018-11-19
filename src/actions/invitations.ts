export const ADD_INVITATION = 'ADD_INVITATION'

export const addInvitation = (classId: string, studentId: string) => ({
  type: ADD_INVITATION,
  classId,
  studentId,
})