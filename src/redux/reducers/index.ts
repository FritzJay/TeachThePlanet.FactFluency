import { loadingBarReducer } from 'react-redux-loading'
import { combineReducers } from 'redux'
import classes from '../reducers/classes'
import factFluency from '../reducers/factFluency'
import user from '../reducers/user'

export default combineReducers({
  classes,
  factFluency,
  user,
  loadingBar: loadingBarReducer,
})