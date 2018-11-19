import { ICourseInvitation } from "src/utils"

export const ADD_INVITATION = 'ADD_INVITATION'
export const REMOVE_INVITATION = 'REMOVE_INVITATION'

export const addInvitation = (classId: string, invitation: ICourseInvitation) => ({
  type: ADD_INVITATION,
  invitation,
  classId,
})

export const removeInvitation = (id: string) => ({
  type: REMOVE_INVITATION,
  id
})