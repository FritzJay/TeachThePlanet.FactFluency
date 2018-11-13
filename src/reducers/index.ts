import { loadingBarReducer } from 'react-redux-loading'
import { combineReducers } from 'redux'
import teacher from './teacher'
import user from './user'
import factFluency from './factFluency';

export default combineReducers({
  factFluency,
  teacher,
  user,
  loadingBar: loadingBarReducer,
})

export const testingReducers = combineReducers({
  factFluency,
  teacher,
  user
})