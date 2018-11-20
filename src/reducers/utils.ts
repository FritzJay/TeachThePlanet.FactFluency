import { IClass } from 'src/utils'

export const formatClasses = (classes: IClass[]): { [id: string]: IClass } => {
  return classes
    ? classes.reduce((acc: object, cls) => ({ ...acc, [cls.id]: {
      ...cls,
      courseInvitations: convertArrayOfObjectsWithIdsIntoObject(cls.courseInvitations),
      students: convertArrayOfObjectsWithIdsIntoObject(cls.students),
    }}), {}) : {}
}

export const convertArrayOfObjectsWithIdsIntoObject = (arr: any[]): { [id: string]: any } => (
  arr
    ? arr.reduce((acc: object, o) => ({ ...acc, [o.id]: o }), {})
    : {}
)
