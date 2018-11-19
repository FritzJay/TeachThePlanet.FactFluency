export const ADD_INVITATION = 'ADD_INVITATION'

export const addInvitation = (classId: string, email: string) => ({
  type: ADD_INVITATION,
  classId,
  email,
})