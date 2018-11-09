import { loadingBarReducer } from 'react-redux-loading'
import { combineReducers } from 'redux'
import factFluency from '../reducers/factFluency'
import user from '../reducers/user'

export default combineReducers({
  factFluency,
  user,
  loadingBar: loadingBarReducer,
})