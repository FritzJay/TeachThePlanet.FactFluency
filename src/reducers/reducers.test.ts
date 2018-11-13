import { testingReducers } from '.'

const originalState = {
  factFluency: { },
  teacherHome: {
    id:'5be11b4de8b8632cd8cd769b',
    name:'teacher2@email.com',
    classes: {
      '5be5920b08aa510b0cb651d4': {
        id:'5be5920b08aa510b0cb651d4',
        code: 'QN6MH53Sf',
        grade: 'first',
        name: 'Homeroom',
        testParameters: {
          id:'5be22996bde0ae4274e3fa95',
          duration: 75,
          numbers: [1,2,3,4,5,6,7,8,9,10,11,12,0],
          operators: ['+','-','*','/'],
          questions: 20,
          randomQuestions: 5
        },
        students: [{
          id:'5be62d7203b2ce1abc02db1f',
          name:'test@test.com'
        }]
      },
      '5bea15803b2e252594ca7cb1': {
        id:'5bea15803b2e252594ca7cb1',
        code:'cHT5tXIEL',
        grade:'kindergarten',
        name:'test',
        testParameters: {
          id:'5bea15803b2e252594ca7cb2',
          duration: 75,
          numbers: [0,1,2,3,4,5,6,7,8,9,10,11,12],
          operators: ['+','-','*','/'],
          questions: 20,
          randomQuestions: 5
        },
        students:[]
      }
    },
    user: {
      email: 'teacher2@email.com',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYWNoZXIyQGVtYWlsLmNvbSIsIl9pZCI6IjViZTExYjRkZThiODYzMmNkOGNkNzY5YSIsInVzZXJUeXBlIjpbInRlYWNoZXIiXSwiaWF0IjoxNTQyMDY3NTgwLCJleHAiOjE1NDIwNzQ3ODB9.NX-y7ofG2Mx8y53JEeflyYTImFeZPRN6hwiKz4YGTho'
    }
  },
  user: {
    email: 'teacher2@email.com',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlYWNoZXIyQGVtYWlsLmNvbSIsIl9pZCI6IjViZTExYjRkZThiODYzMmNkOGNkNzY5YSIsInVzZXJUeXBlIjpbInRlYWNoZXIiXSwiaWF0IjoxNTQyMDY3NTgwLCJleHAiOjE1NDIwNzQ3ODB9.NX-y7ofG2Mx8y53JEeflyYTImFeZPRN6hwiKz4YGTho'
  }, loadingBar: {'default':0}
}

test('reducers', () => {

  describe('removeClass', () => {
    const action = {
      type: 'REMOVE_CLASS',
      id: '5bea15803b2e252594ca7cb1'
    }
    const state = testingReducers(originalState, action)
    const classesState = state.teacherHome.classes
    const expected = {
      '5be5920b08aa510b0cb651d4': {
        id:'5be5920b08aa510b0cb651d4',
        code: 'QN6MH53Sf',
        grade: 'first',
        name: 'Homeroom',
        testParameters: {
          id:'5be22996bde0ae4274e3fa95',
          duration: 75,
          numbers: [1,2,3,4,5,6,7,8,9,10,11,12,0],
          operators: ['+','-','*','/'],
          questions: 20,
          randomQuestions: 5
        },
        students: [{
          id:'5be62d7203b2ce1abc02db1f',
          name:'test@test.com'
        }]
      }
    }
    expect(classesState).toEqual(expected)
  })

  describe('changeClass', () => {
    const action = {
      type: 'CHANGE_CLASS',
      id: '5bea15803b2e252594ca7cb1'
    }
    const state = testingReducers(originalState, action)
    const classesState = state.teacherHome.classes
    const expected = {
      '5be5920b08aa510b0cb651d4': {
        id:'5be5920b08aa510b0cb651d4',
        code: 'QN6MH53Sf',
        grade: 'first',
        name: 'Homeroom',
        testParameters: {
          id:'5be22996bde0ae4274e3fa95',
          duration: 75,
          numbers: [1,2,3,4,5,6,7,8,9,10,11,12,0],
          operators: ['+','-','*','/'],
          questions: 20,
          randomQuestions: 5
        },
        students: [{
          id:'5be62d7203b2ce1abc02db1f',
          name:'test@test.com'
        }]
      }
    }
    expect(classesState).toEqual(expected)
  })
})
