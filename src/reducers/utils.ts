import { IClass, ICourseInvitation } from 'src/utils'

export const formatClasses = (classes: IClass[]): { [id: string]: IClass } => {
  return classes
    ? classes.reduce((acc: object, cls) => ({ ...acc, [cls.id]: {
      ...cls,
      courseInvitations: formatCourseInvitations(cls.courseInvitations)
    }}), {}) : {}
}

export const formatCourseInvitations = (courseInvitations: ICourseInvitation[]): { [id: string]: ICourseInvitation } => {
  return courseInvitations
    ? courseInvitations.reduce((acc: object, invitation) => ({ ...acc, [invitation.id]: invitation }), {}) 
    : {}
}