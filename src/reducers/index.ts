import { loadingBarReducer } from 'react-redux-loading'
import { combineReducers } from 'redux'
import teacherHome from './teacherHome'
import user from './user'
import factFluency from './factFluency';

export default combineReducers({
  factFluency,
  teacherHome,
  user,
  loadingBar: loadingBarReducer,
})

export const testingReducers = combineReducers({
  factFluency,
  teacherHome,
  user
})