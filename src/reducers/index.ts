import { loadingBarReducer } from 'react-redux-loading-bar'
import { combineReducers } from 'redux'
import teacherHome from './teacherHome'
import user from './user'
import factFluency from './factFluency'
import courses from './courses'
import courseInvitations from './courseInvitations'

export default combineReducers({
  factFluency,
  teacherHome,
  courses,
  courseInvitations,
  user,
  loadingBar: loadingBarReducer,
})

export const testingReducers = combineReducers({
  factFluency,
  teacherHome,
  user
})